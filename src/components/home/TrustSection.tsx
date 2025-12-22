import { Shield, Award, Truck, HeadphonesIcon, RefreshCw, CreditCard } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "ISO 13485 Certified",
    description: "All products meet international quality standards for medical devices",
    color: "text-medical-blue",
    bg: "bg-medical-blue-light",
  },
  {
    icon: Award,
    title: "CE & FDA Certified",
    description: "Regulatory compliance for European and US markets",
    color: "text-medical-teal",
    bg: "bg-medical-teal-light",
  },
  {
    icon: Truck,
    title: "Pan India Delivery",
    description: "Free shipping on orders above ₹50,000 with live tracking",
    color: "text-medical-green",
    bg: "bg-medical-green-light",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Dedicated technical support for installation and maintenance",
    color: "text-medical-orange",
    bg: "bg-medical-orange-light",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "Hassle-free returns within 30 days of purchase",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Multiple payment options including EMI for hospitals",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
];

export const TrustSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Why Choose MediSurg?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We are committed to providing the highest quality medical equipment 
            with exceptional service and support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-border/50 bg-card hover:border-border hover:shadow-lg transition-all"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`h-7 w-7 ${feature.color}`} />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
