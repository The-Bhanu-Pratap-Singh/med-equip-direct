import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/products";
import { Button } from "@/components/ui/button";

const categoryColors: Record<string, string> = {
  "medical-blue": "from-medical-blue/20 to-medical-blue/5 hover:from-medical-blue/30 hover:to-medical-blue/10",
  "medical-teal": "from-medical-teal/20 to-medical-teal/5 hover:from-medical-teal/30 hover:to-medical-teal/10",
  "medical-green": "from-medical-green/20 to-medical-green/5 hover:from-medical-green/30 hover:to-medical-green/10",
  "medical-orange": "from-medical-orange/20 to-medical-orange/5 hover:from-medical-orange/30 hover:to-medical-orange/10",
};

const categoryIconBg: Record<string, string> = {
  "medical-blue": "bg-medical-blue-light",
  "medical-teal": "bg-medical-teal-light",
  "medical-green": "bg-medical-green-light",
  "medical-orange": "bg-medical-orange-light",
};

export const CategorySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Shop by Specialty
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our comprehensive range of medical and surgical equipment 
            organized by specialty for easy navigation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`category-card h-full bg-gradient-to-b ${categoryColors[category.color]} border border-border/50 group-hover:border-border group-hover:shadow-lg`}
              >
                <div className={`w-16 h-16 ${categoryIconBg[category.color]} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm font-medium text-muted-foreground">
                    {category.productCount} Products
                  </span>
                  <span className="w-8 h-8 rounded-full bg-background flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products">
            <Button size="lg" variant="outline" className="gap-2">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
