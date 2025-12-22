import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, Building2, User, Mail, Phone, FileText, Plus, Trash2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

interface QuotationItem {
  productId: string;
  quantity: number;
}

const Quotation = () => {
  const { toast } = useToast();
  const [userType, setUserType] = useState<"individual" | "hospital">("hospital");
  const [isLoading, setIsLoading] = useState(false);
  const [quotationItems, setQuotationItems] = useState<QuotationItem[]>([
    { productId: "", quantity: 1 },
  ]);

  const addItem = () => {
    setQuotationItems([...quotationItems, { productId: "", quantity: 1 }]);
  };

  const removeItem = (index: number) => {
    setQuotationItems(quotationItems.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof QuotationItem, value: string | number) => {
    const updated = [...quotationItems];
    updated[index] = { ...updated[index], [field]: value };
    setQuotationItems(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({
      title: "Quotation Request Submitted!",
      description: "Our team will contact you within 24 hours with a customized quote.",
    });
  };

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen py-12">
        <div className="container">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Request Quotation</span>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Request a Custom Quotation
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get personalized pricing for your medical equipment needs. 
                Our team will prepare a detailed quotation tailored to your requirements.
              </p>
            </div>

            <div className="bg-card rounded-3xl border shadow-xl p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Account Type */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                      1
                    </span>
                    Account Type
                  </h2>
                  <RadioGroup
                    value={userType}
                    onValueChange={(value) => setUserType(value as "individual" | "hospital")}
                    className="grid md:grid-cols-2 gap-4"
                  >
                    <Label
                      htmlFor="q-individual"
                      className={`flex items-center gap-4 p-6 rounded-xl border cursor-pointer transition-all ${
                        userType === "individual"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value="individual" id="q-individual" />
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-medium">Individual / Doctor</p>
                          <p className="text-sm text-muted-foreground">Personal practice</p>
                        </div>
                      </div>
                    </Label>
                    <Label
                      htmlFor="q-hospital"
                      className={`flex items-center gap-4 p-6 rounded-xl border cursor-pointer transition-all ${
                        userType === "hospital"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value="hospital" id="q-hospital" />
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                          <Building2 className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-medium">Hospital / Clinic</p>
                          <p className="text-sm text-muted-foreground">Bulk pricing available</p>
                        </div>
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                      2
                    </span>
                    Contact Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="name" placeholder="Dr. John Doe" className="pl-10" required />
                      </div>
                    </div>
                    {userType === "hospital" && (
                      <div className="space-y-2">
                        <Label htmlFor="organization">Organization Name *</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="organization"
                            placeholder="City Hospital"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@hospital.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    {userType === "hospital" && (
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="gst">GST Number (for tax benefits)</Label>
                        <Input id="gst" placeholder="29ABCDE1234F1Z5" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Selection */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                      3
                    </span>
                    Products Required
                  </h2>
                  <div className="space-y-4">
                    {quotationItems.map((item, index) => (
                      <div
                        key={index}
                        className="grid md:grid-cols-[1fr,100px,auto] gap-4 items-end p-4 bg-muted/50 rounded-xl"
                      >
                        <div className="space-y-2">
                          <Label>Select Product</Label>
                          <Select
                            value={item.productId}
                            onValueChange={(value) => updateItem(index, "productId", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a product" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <div key={category.id}>
                                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase">
                                    {category.name}
                                  </div>
                                  {products
                                    .filter((p) => p.category === category.id)
                                    .map((product) => (
                                      <SelectItem key={product.id} value={product.id}>
                                        {product.name}
                                      </SelectItem>
                                    ))}
                                </div>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Quantity</Label>
                          <Input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) =>
                              updateItem(index, "quantity", parseInt(e.target.value) || 1)
                            }
                          />
                        </div>
                        {quotationItems.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => removeItem(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addItem} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Another Product
                    </Button>
                  </div>
                </div>

                {/* Additional Requirements */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                      4
                    </span>
                    Additional Requirements
                  </h2>
                  <div className="space-y-2">
                    <Label htmlFor="requirements">
                      <FileText className="inline h-4 w-4 mr-2" />
                      Special Requirements or Notes
                    </Label>
                    <Textarea
                      id="requirements"
                      placeholder="Please mention any specific requirements, installation needs, training requirements, or questions you may have..."
                      rows={4}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button type="submit" size="lg" className="w-full gap-2" disabled={isLoading}>
                    {isLoading ? (
                      "Submitting Request..."
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Submit Quotation Request
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Our team will respond within 24 hours with a detailed quotation
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Quotation;
