import { Link } from "react-router-dom";
import { ArrowRight, Shield, Award, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-mesh">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" />

      <div className="container relative py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              ISO 13485 Certified Medical Equipment
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
              Premium{" "}
              <span className="text-gradient">Surgical & Medical</span>{" "}
              Equipment
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Trusted by 500+ hospitals and clinics across India. 
              We provide world-class medical devices for plastic surgery, 
              orthopedics, arthroscopy, and laparoscopy procedures.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/products">
                <Button size="xl" variant="hero" className="gap-2">
                  Browse Equipment
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/quotation">
                <Button size="xl" variant="outline" className="gap-2">
                  Request Quotation
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-medical-blue-light flex items-center justify-center">
                  <Award className="h-5 w-5 text-medical-blue" />
                </div>
                <div>
                  <p className="font-semibold text-sm">CE Certified</p>
                  <p className="text-xs text-muted-foreground">European Standards</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-medical-teal-light flex items-center justify-center">
                  <Shield className="h-5 w-5 text-medical-teal" />
                </div>
                <div>
                  <p className="font-semibold text-sm">FDA Registered</p>
                  <p className="text-xs text-muted-foreground">US Compliance</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-medical-green-light flex items-center justify-center">
                  <Truck className="h-5 w-5 text-medical-green" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Pan India</p>
                  <p className="text-xs text-muted-foreground">Free Delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative z-10 aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-3" />
              <div className="absolute inset-0 glass rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center animate-float">
                      <span className="text-6xl">🏥</span>
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-2">Medical Excellence</h3>
                    <p className="text-muted-foreground text-sm">Precision instruments for life-saving procedures</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 shadow-lg animate-float" style={{ animationDelay: "0.5s" }}>
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Hospitals Trust Us</p>
            </div>
            <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 shadow-lg animate-float" style={{ animationDelay: "1s" }}>
              <p className="text-3xl font-bold text-medical-teal">1000+</p>
              <p className="text-sm text-muted-foreground">Products Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
