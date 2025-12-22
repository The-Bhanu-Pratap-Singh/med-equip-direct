import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { categories } from "@/data/products";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+911234567890" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">+91 123 456 7890</span>
            </a>
            <a href="mailto:support@medisurg.com" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">support@medisurg.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">ISO 13485 | CE Certified | FDA Registered</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="glass-strong border-b">
        <div className="container py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
                <span className="text-primary-foreground font-bold text-lg">M+</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-heading font-bold text-xl text-foreground">MediSurg</h1>
                <p className="text-xs text-muted-foreground">Medical Equipment</p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search medical equipment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 h-11 rounded-xl bg-muted/50 border-0 focus-visible:ring-2"
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-medical-teal text-primary-foreground text-xs font-medium flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
              <Link to="/auth" className="hidden sm:block">
                <Button variant="outline" className="gap-2">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
              <Link to="/admin" className="hidden sm:block">
                <Button variant="default" size="sm">
                  Admin
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mt-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 rounded-lg bg-muted/50 border-0"
              />
            </div>
          </form>
        </div>

        {/* Navigation */}
        <nav className="border-t border-border/50">
          <div className="container">
            <ul className="hidden md:flex items-center gap-1 py-2">
              <li>
                <Link to="/products">
                  <Button variant="ghost" size="sm" className="font-medium">
                    All Products
                  </Button>
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/products?category=${category.id}`}>
                    <Button variant="ghost" size="sm" className="font-medium">
                      {category.name}
                    </Button>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/quotation">
                  <Button variant="ghost" size="sm" className="font-medium text-medical-teal">
                    Request Quotation
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-strong border-b animate-slide-in-left">
          <div className="container py-4">
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/products" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start font-medium">
                    All Products
                  </Button>
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/products?category=${category.id}`} onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start font-medium">
                      {category.icon} {category.name}
                    </Button>
                  </Link>
                </li>
              ))}
              <li className="border-t pt-2 mt-2">
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <User className="h-4 w-4" />
                    Login / Register
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/quotation" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="medical-teal" className="w-full">
                    Request Quotation
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};
