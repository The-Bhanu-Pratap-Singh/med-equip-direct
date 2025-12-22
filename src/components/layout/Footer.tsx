import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/products";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-heading font-bold mb-2">Stay Updated</h3>
              <p className="text-background/70">Subscribe for the latest medical equipment updates and offers.</p>
            </div>
            <form className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button variant="secondary" className="shrink-0">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">M+</span>
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl">MediSurg</h2>
                <p className="text-xs text-background/60">Medical Equipment</p>
              </div>
            </div>
            <p className="text-background/70 mb-6 text-sm leading-relaxed">
              Your trusted partner for premium medical and surgical equipment. 
              Serving hospitals, clinics, and healthcare facilities across India with 
              ISO certified products.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/products?category=${category.id}`}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-background/70 hover:text-background transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-background/70 hover:text-background transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/quotation" className="text-background/70 hover:text-background transition-colors text-sm">
                  Request Quotation
                </Link>
              </li>
              <li>
                <Link to="/certifications" className="text-background/70 hover:text-background transition-colors text-sm">
                  Certifications
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-background/70 hover:text-background transition-colors text-sm">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-background/70 hover:text-background transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                  123 Medical District,<br />
                  Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:+911234567890" className="text-background/70 hover:text-background transition-colors text-sm">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:support@medisurg.com" className="text-background/70 hover:text-background transition-colors text-sm">
                  support@medisurg.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/60 text-sm">
              © 2024 MediSurg. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-background/60 text-xs">ISO 13485 Certified</span>
              <span className="text-background/60 text-xs">CE Marked</span>
              <span className="text-background/60 text-xs">FDA Registered</span>
            </div>
          </div>
          <p className="text-background/40 text-xs mt-4 text-center md:text-left">
            Disclaimer: All medical devices sold are for professional use only. 
            Please ensure proper training and certification before operating any medical equipment.
          </p>
        </div>
      </div>
    </footer>
  );
};
