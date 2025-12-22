import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Filter, Grid3X3, List, SlidersHorizontal, ShoppingCart, Eye, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products, categories } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import { CertificationType } from "@/types/product";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");

  // Filters
  const categoryFilter = searchParams.get("category") || "";
  const searchFilter = searchParams.get("search") || "";
  const [selectedCertifications, setSelectedCertifications] = useState<CertificationType[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Search filter
    if (searchFilter) {
      const query = searchFilter.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Certification filter
    if (selectedCertifications.length > 0) {
      result = result.filter((p) =>
        selectedCertifications.some((cert) => p.certifications.includes(cert))
      );
    }

    // Stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [categoryFilter, searchFilter, selectedCertifications, inStockOnly, sortBy]);

  const clearFilters = () => {
    setSearchParams({});
    setSelectedCertifications([]);
    setInStockOnly(false);
  };

  const activeCategory = categories.find((c) => c.id === categoryFilter);
  const hasActiveFilters = categoryFilter || selectedCertifications.length > 0 || inStockOnly;

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !categoryFilter ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
            onClick={() => setSearchParams({})}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                categoryFilter === category.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
              onClick={() => setSearchParams({ category: category.id })}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h3 className="font-semibold mb-3">Certifications</h3>
        <div className="space-y-2">
          {(["ISO", "CE", "FDA"] as CertificationType[]).map((cert) => (
            <div key={cert} className="flex items-center space-x-2">
              <Checkbox
                id={cert}
                checked={selectedCertifications.includes(cert)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCertifications([...selectedCertifications, cert]);
                  } else {
                    setSelectedCertifications(selectedCertifications.filter((c) => c !== cert));
                  }
                }}
              />
              <Label htmlFor={cert} className="text-sm cursor-pointer">
                {cert} Certified
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-semibold mb-3">Availability</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(!!checked)}
          />
          <Label htmlFor="in-stock" className="text-sm cursor-pointer">
            In Stock Only
          </Label>
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen">
        <div className="container py-8">
          {/* Breadcrumb & Header */}
          <div className="mb-8">
            <div className="text-sm text-muted-foreground mb-2">
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Products</span>
              {activeCategory && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-foreground">{activeCategory.name}</span>
                </>
              )}
            </div>
            <h1 className="text-3xl font-heading font-bold">
              {activeCategory ? activeCategory.name : "All Products"}
            </h1>
            {activeCategory && (
              <p className="text-muted-foreground mt-2">{activeCategory.description}</p>
            )}
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 bg-card rounded-2xl border p-6">
                <FilterSidebar />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                        <SheetDescription>
                          Narrow down your product search
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterSidebar />
                      </div>
                    </SheetContent>
                  </Sheet>
                  <p className="text-sm text-muted-foreground">
                    {filteredProducts.length} products found
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="hidden sm:flex items-center border rounded-lg p-1">
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Products Grid/List */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-2xl border">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-card rounded-2xl border overflow-hidden card-hover"
                    >
                      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl opacity-30">🏥</div>
                        </div>
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                          {product.certifications.map((cert) => (
                            <Badge
                              key={cert}
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0.5 bg-background/90"
                            >
                              {cert}
                            </Badge>
                          ))}
                        </div>
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex gap-2">
                            <Link to={`/product/${product.slug}`}>
                              <Button size="sm" variant="secondary" className="shadow-lg">
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                View
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              onClick={() => addToCart(product)}
                              className="shadow-lg"
                            >
                              <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-muted-foreground mb-1 capitalize">
                          {product.category.replace("-", " ")} • {product.subCategory}
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
                          <Badge
                            variant={product.inStock ? "default" : "destructive"}
                            className="text-[10px]"
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-card rounded-2xl border p-4 flex gap-6 card-hover"
                    >
                      <div className="w-48 shrink-0 aspect-[4/3] bg-muted rounded-xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl opacity-30">🏥</div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {product.certifications.map((cert) => (
                            <Badge key={cert} variant="secondary" className="text-[10px]">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground mb-1 capitalize">
                          {product.category.replace("-", " ")} • {product.subCategory}
                        </div>
                        <Link to={`/product/${product.slug}`}>
                          <h3 className="font-semibold group-hover:text-primary transition-colors mb-2">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {product.description}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div>
                            <p className="font-bold text-xl text-primary">
                              {formatPrice(product.price)}
                            </p>
                            {product.bulkPrice && (
                              <p className="text-sm text-muted-foreground">
                                Bulk: {formatPrice(product.bulkPrice)} (min{" "}
                                {product.minBulkQuantity} units)
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={product.inStock ? "default" : "destructive"}>
                              {product.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                            <Link to={`/product/${product.slug}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                            </Link>
                            <Button size="sm" onClick={() => addToCart(product)}>
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
