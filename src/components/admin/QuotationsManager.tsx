import { useState, useEffect } from "react";
import { Search, Filter, MoreVertical, Eye, Send, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";

type QuotationStatus = "pending" | "reviewed" | "quoted" | "accepted" | "rejected" | "expired";

interface Quotation {
  id: string;
  quotation_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  company_name: string | null;
  gst_number: string | null;
  items: any;
  message: string | null;
  status: QuotationStatus | null;
  quoted_amount: number | null;
  admin_notes: string | null;
  valid_until: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "destructive",
  reviewed: "secondary",
  quoted: "default",
  accepted: "default",
  rejected: "destructive",
  expired: "outline",
};

export const QuotationsManager = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteData, setQuoteData] = useState({
    quoted_amount: "",
    admin_notes: "",
    valid_days: "30",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("quotations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error fetching quotations", variant: "destructive" });
    } else {
      setQuotations(data || []);
    }
    setLoading(false);
  };

  const updateQuotationStatus = async (quotationId: string, status: QuotationStatus) => {
    const { error } = await supabase
      .from("quotations")
      .update({ status })
      .eq("id", quotationId);

    if (error) {
      toast({ title: "Error updating quotation", variant: "destructive" });
    } else {
      toast({ title: `Quotation marked as ${status}` });
      fetchQuotations();
    }
  };

  const handleSendQuote = async () => {
    if (!selectedQuotation) return;

    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + parseInt(quoteData.valid_days));

    const { error } = await supabase
      .from("quotations")
      .update({
        status: "quoted" as QuotationStatus,
        quoted_amount: parseFloat(quoteData.quoted_amount),
        admin_notes: quoteData.admin_notes,
        valid_until: validUntil.toISOString(),
      })
      .eq("id", selectedQuotation.id);

    if (error) {
      toast({ title: "Error sending quote", variant: "destructive" });
    } else {
      toast({ title: "Quote sent successfully" });
      setIsQuoteOpen(false);
      setQuoteData({ quoted_amount: "", admin_notes: "", valid_days: "30" });
      fetchQuotations();
    }
  };

  const filteredQuotations = quotations.filter((quotation) => {
    const matchesSearch =
      quotation.quotation_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quotation.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quotation.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (quotation.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesStatus = statusFilter === "all" || quotation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quotations..."
              className="pl-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="quoted">Quoted</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-card rounded-2xl border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : filteredQuotations.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No quotations found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Quotation</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Customer</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Company</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Items</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Quoted</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotations.map((quotation) => (
                  <tr key={quotation.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="p-4">
                      <p className="font-medium">{quotation.quotation_number}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium">{quotation.customer_name}</p>
                      <p className="text-xs text-muted-foreground">{quotation.customer_email}</p>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {quotation.company_name || "-"}
                    </td>
                    <td className="p-4">
                      {Array.isArray(quotation.items) ? quotation.items.length : 0} items
                    </td>
                    <td className="p-4 font-medium">
                      {quotation.quoted_amount ? formatPrice(quotation.quoted_amount) : "-"}
                    </td>
                    <td className="p-4">
                      <Badge variant={statusColors[quotation.status || "pending"] as any}>
                        {quotation.status || "pending"}
                      </Badge>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {format(new Date(quotation.created_at), "dd MMM yyyy")}
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedQuotation(quotation);
                            setIsDetailOpen(true);
                          }}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => updateQuotationStatus(quotation.id, "reviewed")}>
                            <Clock className="h-4 w-4 mr-2" />
                            Mark Reviewed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedQuotation(quotation);
                            setIsQuoteOpen(true);
                          }}>
                            <Send className="h-4 w-4 mr-2" />
                            Send Quote
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateQuotationStatus(quotation.id, "accepted")}>
                            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                            Mark Accepted
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => updateQuotationStatus(quotation.id, "rejected")}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quotation Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Quotation Details - {selectedQuotation?.quotation_number}</DialogTitle>
            <DialogDescription>
              Requested on {selectedQuotation && format(new Date(selectedQuotation.created_at), "PPP")}
            </DialogDescription>
          </DialogHeader>
          {selectedQuotation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Customer Info</h4>
                  <p className="text-sm">{selectedQuotation.customer_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedQuotation.customer_email}</p>
                  <p className="text-sm text-muted-foreground">{selectedQuotation.customer_phone}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Company Details</h4>
                  <p className="text-sm">{selectedQuotation.company_name || "N/A"}</p>
                  <p className="text-sm text-muted-foreground">GST: {selectedQuotation.gst_number || "N/A"}</p>
                </div>
              </div>
              {selectedQuotation.message && (
                <div>
                  <h4 className="font-medium mb-2">Message</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    {selectedQuotation.message}
                  </p>
                </div>
              )}
              <div>
                <h4 className="font-medium mb-2">Requested Items</h4>
                <div className="bg-muted rounded-lg p-4">
                  {Array.isArray(selectedQuotation.items) ? (
                    selectedQuotation.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between py-2 border-b last:border-0">
                        <span>{item.name || item.product_name} x {item.quantity}</span>
                        <span className="text-muted-foreground">{formatPrice(item.price)}/unit</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No items</p>
                  )}
                </div>
              </div>
              {selectedQuotation.quoted_amount && (
                <div className="flex justify-between border-t pt-4">
                  <span className="text-lg font-semibold">Quoted Amount</span>
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(selectedQuotation.quoted_amount)}
                  </span>
                </div>
              )}
              {selectedQuotation.admin_notes && (
                <div>
                  <h4 className="font-medium mb-2">Admin Notes</h4>
                  <p className="text-sm text-muted-foreground">{selectedQuotation.admin_notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Send Quote Dialog */}
      <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Quote</DialogTitle>
            <DialogDescription>
              Provide a quote for {selectedQuotation?.quotation_number}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quoted_amount">Quoted Amount (₹)</Label>
              <Input
                id="quoted_amount"
                type="number"
                placeholder="Enter total quote amount"
                value={quoteData.quoted_amount}
                onChange={(e) => setQuoteData({ ...quoteData, quoted_amount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valid_days">Valid For (Days)</Label>
              <Select
                value={quoteData.valid_days}
                onValueChange={(value) => setQuoteData({ ...quoteData, valid_days: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem value="15">15 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="60">60 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin_notes">Notes (Optional)</Label>
              <Textarea
                id="admin_notes"
                placeholder="Any additional notes for the customer..."
                value={quoteData.admin_notes}
                onChange={(e) => setQuoteData({ ...quoteData, admin_notes: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsQuoteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendQuote}>
                <Send className="h-4 w-4 mr-2" />
                Send Quote
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
