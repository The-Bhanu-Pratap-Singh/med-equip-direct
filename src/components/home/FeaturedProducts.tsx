import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { featuredProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";

export const FeaturedProducts = () => {
  const { addToCart } = useCart();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Featured Equipment
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover our most popular medical devices trusted by leading healthcare facilities.
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="gap-2 shrink-0">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product, index) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl border border-border/50 overflow-hidden card-hover"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-30">🏥</div>
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {product.certifications.map((cert) => (
                    <Badge
                      key={cert}
                      variant="secondary"
                      className="text-[10px] px-1.5 py-0.5 bg-background/90 backdrop-blur-sm"
                    >
                      {cert}
                    </Badge>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Link to={`/product/${product.slug}`}>
                      <Button size="sm" variant="secondary" className="gap-1.5 shadow-lg">
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="default"
                      className="gap-1.5 shadow-lg"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="text-xs text-muted-foreground mb-1 capitalize">
                  {product.category.replace("-", " ")}
                </div>
                <Link to={`/product/${product.slug}`}>
                  <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg text-primary">
                      {formatPrice(product.price)}
                    </p>
                    {product.bulkPrice && (
                      <p className="text-xs text-muted-foreground">
                        Bulk: {formatPrice(product.bulkPrice)}
                      </p>
                    )}
                  </div>
                  <Badge variant={product.inStock ? "default" : "destructive"} className="text-[10px]">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
