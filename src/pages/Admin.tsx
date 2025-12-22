import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Settings,
  BarChart3,
  Menu,
  X,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { products, categories } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Package, label: "Products", id: "products" },
  { icon: ShoppingCart, label: "Orders", id: "orders" },
  { icon: Users, label: "Customers", id: "customers" },
  { icon: FileText, label: "Quotations", id: "quotations" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const mockStats = [
  {
    label: "Total Revenue",
    value: "₹24,56,890",
    change: "+12.5%",
    trend: "up",
    icon: "💰",
  },
  {
    label: "Orders This Month",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: "📦",
  },
  {
    label: "Active Customers",
    value: "89",
    change: "+15.3%",
    trend: "up",
    icon: "👥",
  },
  {
    label: "Pending Quotations",
    value: "23",
    change: "-3.1%",
    trend: "down",
    icon: "📋",
  },
];

const mockOrders = [
  {
    id: "ORD-001",
    customer: "City Hospital",
    products: 3,
    total: 845000,
    status: "processing",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Dr. Sharma Clinic",
    products: 1,
    total: 285000,
    status: "shipped",
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Metro Surgery Center",
    products: 5,
    total: 1250000,
    status: "delivered",
    date: "2024-01-13",
  },
  {
    id: "ORD-004",
    customer: "HealthFirst Hospital",
    products: 2,
    total: 520000,
    status: "pending",
    date: "2024-01-12",
  },
];

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-2xl border p-6 card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <Badge
                variant={stat.trend === "up" ? "default" : "destructive"}
                className="gap-1"
              >
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {stat.change}
              </Badge>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-2xl border">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="font-heading font-semibold text-lg">Recent Orders</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Order ID
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Customer
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Products
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Total
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Date
                </th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4">{order.products} items</td>
                  <td className="p-4 font-medium">{formatPrice(order.total)}</td>
                  <td className="p-4">
                    <Badge
                      variant={
                        order.status === "delivered"
                          ? "default"
                          : order.status === "shipped"
                          ? "secondary"
                          : order.status === "processing"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted-foreground">{order.date}</td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Update Status
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Overview */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border p-6">
          <h2 className="font-heading font-semibold text-lg mb-4">
            Products by Category
          </h2>
          <div className="space-y-4">
            {categories.map((category) => {
              const productCount = products.filter(
                (p) => p.category === category.id
              ).length;
              const percentage = (productCount / products.length) * 100;
              return (
                <div key={category.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      {category.icon} {category.name}
                    </span>
                    <span className="text-sm font-medium">{productCount}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card rounded-2xl border p-6">
          <h2 className="font-heading font-semibold text-lg mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Plus className="h-5 w-5" />
              Add Product
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <FileText className="h-5 w-5" />
              New Quotation
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Users className="h-5 w-5" />
              Add Customer
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <BarChart3 className="h-5 w-5" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-10 w-64" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="bg-card rounded-2xl border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Product
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Category
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Price
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Stock
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 10).map((product) => (
              <tr key={product.id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      🏥
                    </div>
                    <div>
                      <p className="font-medium line-clamp-1">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.brand} • {product.model}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 capitalize">
                  {product.category.replace("-", " ")}
                </td>
                <td className="p-4 font-medium">{formatPrice(product.price)}</td>
                <td className="p-4">{product.stockQuantity}</td>
                <td className="p-4">
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "products":
        return renderProducts();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 glass-strong border-b">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">M+</span>
            </div>
            <span className="font-heading font-bold">Admin</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-card border-r transform transition-transform lg:transform-none ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 border-b hidden lg:block">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">M+</span>
              </div>
              <div>
                <h1 className="font-heading font-bold">MediSurg</h1>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </Link>
          </div>

          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <Link to="/">
              <Button variant="outline" className="w-full">
                Back to Store
              </Button>
            </Link>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-foreground/20 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-heading font-bold capitalize">
              {activeSection}
            </h1>
            <p className="text-muted-foreground">
              {activeSection === "dashboard"
                ? "Overview of your store performance"
                : `Manage your ${activeSection}`}
            </p>
          </div>
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
