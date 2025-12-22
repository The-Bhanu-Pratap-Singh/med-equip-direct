import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-heading font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any medical equipment to your cart yet.
            </p>
            <Link to="/products">
              <Button size="lg" className="gap-2">
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const shipping = totalPrice >= 50000 ? 0 : 2500;
  const grandTotal = totalPrice + shipping;

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen">
        <div className="container py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Shopping Cart</span>
          </div>

          <h1 className="text-3xl font-heading font-bold mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const isBulkPrice =
                  item.product.bulkPrice &&
                  item.quantity >= (item.product.minBulkQuantity || 0);
                const currentPrice = isBulkPrice
                  ? item.product.bulkPrice!
                  : item.product.price;

                return (
                  <div
                    key={item.product.id}
                    className="bg-card rounded-2xl border p-4 flex gap-4"
                  >
                    {/* Image */}
                    <div className="w-28 h-28 shrink-0 bg-muted rounded-xl overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-3xl opacity-30">🏥</div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link
                            to={`/product/${item.product.slug}`}
                            className="font-medium hover:text-primary transition-colors line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1 capitalize">
                            {item.product.category.replace("-", " ")} • {item.product.brand}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-end justify-between mt-4">
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.product.id,
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="w-12 h-8 text-center text-sm border-0 focus-visible:ring-0 p-0"
                            min={1}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-primary">
                            {formatPrice(currentPrice * item.quantity)}
                          </p>
                          {isBulkPrice && (
                            <p className="text-xs text-medical-green">
                              Bulk discount applied!
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {formatPrice(currentPrice)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={clearCart}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border p-6 sticky top-24">
                <h2 className="font-heading font-bold text-lg mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-medical-green">FREE</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add {formatPrice(50000 - totalPrice)} more for free shipping
                    </p>
                  )}
                  <div className="border-t pt-4 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl text-primary">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    GST included • EMI options available at checkout
                  </p>
                </div>

                <div className="space-y-3">
                  <Button size="lg" className="w-full gap-2">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Link to="/quotation" className="block">
                    <Button variant="outline" size="lg" className="w-full">
                      Request Custom Quotation
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-muted-foreground mb-3">We Accept</p>
                  <div className="flex flex-wrap gap-2">
                    {["UPI", "Card", "Net Banking", "EMI"].map((method) => (
                      <span
                        key={method}
                        className="px-2 py-1 bg-muted rounded text-xs font-medium"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
