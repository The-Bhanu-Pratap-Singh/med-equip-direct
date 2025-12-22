import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw, FileText, Minus, Plus, MessageSquare } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { getProductBySlug, getProductsByCategory } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = getProductBySlug(slug || "");

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/products">
            <Button>Browse All Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const isBulkPrice = product.bulkPrice && quantity >= (product.minBulkQuantity || 0);
  const currentPrice = isBulkPrice ? product.bulkPrice! : product.price;
  const totalPrice = currentPrice * quantity;

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen">
        <div className="container py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-foreground">Products</Link>
            <span className="mx-2">/</span>
            <Link to={`/products?category=${product.category}`} className="hover:text-foreground capitalize">
              {product.category.replace("-", " ")}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          {/* Product Main Section */}
          <div className="bg-card rounded-3xl border p-6 lg:p-8 mb-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Images */}
              <div className="space-y-4">
                <div className="aspect-square bg-muted rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-9xl opacity-30">🏥</div>
                  </div>
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {product.certifications.map((cert) => (
                      <Badge key={cert} className="bg-background/90">
                        {cert} Certified
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-muted rounded-xl overflow-hidden relative cursor-pointer hover:ring-2 ring-primary transition-all"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-2xl opacity-30">🏥</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="outline" className="capitalize">
                      {product.category.replace("-", " ")}
                    </Badge>
                    <Badge variant="secondary">{product.subCategory}</Badge>
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? `${product.stockQuantity} In Stock` : "Out of Stock"}
                    </Badge>
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-heading font-bold mb-2">
                    {product.name}
                  </h1>
                  <p className="text-muted-foreground">
                    Brand: <span className="font-medium text-foreground">{product.brand}</span> |
                    Model: <span className="font-medium text-foreground">{product.model}</span>
                  </p>
                </div>

                <div className="border-t border-b py-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-bold text-primary">
                      {formatPrice(currentPrice)}
                    </span>
                    {isBulkPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                  {product.bulkPrice && (
                    <p className="text-sm text-medical-green">
                      💰 Bulk price: {formatPrice(product.bulkPrice)} (min {product.minBulkQuantity} units)
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    GST Invoice Available | EMI Options for Hospitals
                  </p>
                </div>

                <p className="text-muted-foreground">{product.description}</p>

                {/* Quantity & Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Quantity:</span>
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 text-center border-0 focus-visible:ring-0"
                        min={1}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-lg font-semibold">
                      Total: {formatPrice(totalPrice)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      size="lg"
                      className="flex-1 gap-2"
                      onClick={() => addToCart(product, quantity)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart
                    </Button>
                    <Link to="/quotation" className="flex-1">
                      <Button size="lg" variant="outline" className="w-full gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Request Quote
                      </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="px-4">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button size="lg" variant="outline" className="px-4">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-medical-blue-light flex items-center justify-center shrink-0">
                      <Shield className="h-5 w-5 text-medical-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Warranty</p>
                      <p className="text-xs text-muted-foreground">{product.warranty}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-medical-teal-light flex items-center justify-center shrink-0">
                      <Truck className="h-5 w-5 text-medical-teal" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Free Shipping</p>
                      <p className="text-xs text-muted-foreground">Orders above ₹50,000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-medical-green-light flex items-center justify-center shrink-0">
                      <RefreshCw className="h-5 w-5 text-medical-green" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Easy Returns</p>
                      <p className="text-xs text-muted-foreground">30-day return policy</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-medical-orange-light flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-medical-orange" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {product.isConsumable ? "Consumable" : "Reusable"}
                      </p>
                      <p className="text-xs text-muted-foreground">Product type</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-card rounded-3xl border p-6 lg:p-8 mb-8">
            <Tabs defaultValue="specifications">
              <TabsList className="mb-6">
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="indications">Indications & Usage</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
              </TabsList>

              <TabsContent value="specifications">
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                    >
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="indications">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Indications for Use</h3>
                  <ul className="space-y-2">
                    {product.indications.map((indication, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-medical-green-light flex items-center justify-center text-sm font-medium text-medical-green shrink-0">
                          {index + 1}
                        </span>
                        <span>{indication}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="certifications">
                <div className="grid md:grid-cols-3 gap-6">
                  {product.certifications.map((cert) => (
                    <div
                      key={cert}
                      className="p-6 bg-muted/50 rounded-xl text-center"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{cert} Certified</h4>
                      <p className="text-sm text-muted-foreground">
                        {cert === "ISO" && "International Organization for Standardization"}
                        {cert === "CE" && "Conformité Européenne - European Conformity"}
                        {cert === "FDA" && "U.S. Food and Drug Administration"}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">Related Products</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    to={`/product/${relatedProduct.slug}`}
                    className="group bg-card rounded-2xl border overflow-hidden card-hover"
                  >
                    <div className="aspect-[4/3] bg-muted relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl opacity-30">🏥</div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="font-bold text-primary">
                        {formatPrice(relatedProduct.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
