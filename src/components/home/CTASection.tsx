import { Link } from "react-router-dom";
import { ArrowRight, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6">
            Need Custom Solutions for Your Hospital?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto">
            Get personalized quotations, bulk pricing, and dedicated support 
            for your healthcare facility. Our experts are ready to assist you.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/quotation">
              <Button size="xl" variant="hero-outline" className="gap-2">
                <MessageSquare className="h-5 w-5" />
                Request Quotation
              </Button>
            </Link>
            <a href="tel:+911234567890">
              <Button size="xl" variant="hero-outline" className="gap-2">
                <Phone className="h-5 w-5" />
                Call Now
              </Button>
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-primary-foreground/70">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-foreground" />
              <span className="text-sm">B2B & B2C Support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-foreground" />
              <span className="text-sm">GST Invoice Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-foreground" />
              <span className="text-sm">EMI Options</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
