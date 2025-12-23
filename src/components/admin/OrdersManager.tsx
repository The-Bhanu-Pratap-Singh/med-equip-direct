import { useState, useEffect } from "react";
import { Search, Filter, MoreVertical, Eye, Truck, CheckCircle, XCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  items: any;
  subtotal: number;
  total_amount: number;
  status: OrderStatus | null;
  payment_status: string | null;
  shipping_address: any;
  tracking_number: string | null;
  courier: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "destructive",
  confirmed: "secondary",
  processing: "outline",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",
};

export const OrdersManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [shippingData, setShippingData] = useState({ courier: "", tracking_number: "" });
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error fetching orders", variant: "destructive" });
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      toast({ title: "Error updating order", variant: "destructive" });
    } else {
      toast({ title: `Order marked as ${status}` });
      fetchOrders();
    }
  };

  const handleShipOrder = async () => {
    if (!selectedOrder) return;

    const { error } = await supabase
      .from("orders")
      .update({
        status: "shipped" as OrderStatus,
        courier: shippingData.courier,
        tracking_number: shippingData.tracking_number,
      })
      .eq("id", selectedOrder.id);

    if (error) {
      toast({ title: "Error updating shipping info", variant: "destructive" });
    } else {
      toast({ title: "Order shipped successfully" });
      setIsShippingOpen(false);
      setShippingData({ courier: "", tracking_number: "" });
      fetchOrders();
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
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
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-card rounded-2xl border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No orders found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Order</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Customer</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Items</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Total</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="p-4">
                      <p className="font-medium">{order.order_number}</p>
                      {order.tracking_number && (
                        <p className="text-xs text-muted-foreground">
                          Track: {order.tracking_number}
                        </p>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="font-medium">{order.customer_name}</p>
                      <p className="text-xs text-muted-foreground">{order.customer_email}</p>
                    </td>
                    <td className="p-4">
                      {Array.isArray(order.items) ? order.items.length : 0} items
                    </td>
                    <td className="p-4 font-medium">{formatPrice(order.total_amount)}</td>
                    <td className="p-4">
                      <Badge variant={statusColors[order.status || "pending"] as any}>
                        {order.status || "pending"}
                      </Badge>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {format(new Date(order.created_at), "dd MMM yyyy")}
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
                            setSelectedOrder(order);
                            setIsDetailOpen(true);
                          }}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "confirmed")}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Confirm Order
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "processing")}>
                            <Package className="h-4 w-4 mr-2" />
                            Mark Processing
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedOrder(order);
                            setIsShippingOpen(true);
                          }}>
                            <Truck className="h-4 w-4 mr-2" />
                            Ship Order
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "delivered")}>
                            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                            Mark Delivered
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => updateOrderStatus(order.id, "cancelled")}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel Order
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

      {/* Order Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.order_number}</DialogTitle>
            <DialogDescription>
              Created on {selectedOrder && format(new Date(selectedOrder.created_at), "PPP")}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Customer Info</h4>
                  <p className="text-sm">{selectedOrder.customer_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer_email}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer_phone}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Shipping Address</h4>
                  <p className="text-sm text-muted-foreground">
                    {typeof selectedOrder.shipping_address === "object" 
                      ? JSON.stringify(selectedOrder.shipping_address, null, 2)
                      : selectedOrder.shipping_address}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Order Items</h4>
                <div className="bg-muted rounded-lg p-4">
                  {Array.isArray(selectedOrder.items) ? (
                    selectedOrder.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between py-2 border-b last:border-0">
                        <span>{item.name || item.product_name} x {item.quantity}</span>
                        <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No items</p>
                  )}
                </div>
              </div>
              <div className="flex justify-between border-t pt-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold text-primary">
                  {formatPrice(selectedOrder.total_amount)}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Shipping Dialog */}
      <Dialog open={isShippingOpen} onOpenChange={setIsShippingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ship Order</DialogTitle>
            <DialogDescription>Enter shipping details for {selectedOrder?.order_number}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="courier">Courier/Carrier</Label>
              <Input
                id="courier"
                placeholder="e.g., FedEx, DHL, BlueDart"
                value={shippingData.courier}
                onChange={(e) => setShippingData({ ...shippingData, courier: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tracking">Tracking Number</Label>
              <Input
                id="tracking"
                placeholder="Enter tracking number"
                value={shippingData.tracking_number}
                onChange={(e) => setShippingData({ ...shippingData, tracking_number: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsShippingOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleShipOrder}>
                <Truck className="h-4 w-4 mr-2" />
                Mark as Shipped
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
