import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Package, ShoppingCart, Users, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/utils";

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  pendingQuotations: number;
}

export const DashboardStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    pendingQuotations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total revenue from delivered orders
        const { data: orders } = await supabase
          .from("orders")
          .select("total_amount, status");

        const totalRevenue = orders
          ?.filter((o) => o.status === "delivered")
          .reduce((sum, o) => sum + Number(o.total_amount), 0) || 0;

        const totalOrders = orders?.length || 0;

        // Fetch total products
        const { count: productCount } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true });

        // Fetch pending quotations
        const { count: quotationCount } = await supabase
          .from("quotations")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending");

        setStats({
          totalRevenue,
          totalOrders,
          totalProducts: productCount || 0,
          pendingQuotations: quotationCount || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Revenue",
      value: formatPrice(stats.totalRevenue),
      change: "+12.5%",
      trend: "up" as const,
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-medical-teal",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders.toString(),
      change: "+8.2%",
      trend: "up" as const,
      icon: <ShoppingCart className="h-5 w-5" />,
      color: "text-primary",
    },
    {
      label: "Active Products",
      value: stats.totalProducts.toString(),
      change: "+15.3%",
      trend: "up" as const,
      icon: <Package className="h-5 w-5" />,
      color: "text-medical-green",
    },
    {
      label: "Pending Quotations",
      value: stats.pendingQuotations.toString(),
      change: "-3.1%",
      trend: "down" as const,
      icon: <FileText className="h-5 w-5" />,
      color: "text-medical-orange",
    },
  ];

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card rounded-2xl border p-6 animate-pulse">
            <div className="h-10 bg-muted rounded mb-4" />
            <div className="h-8 bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className="bg-card rounded-2xl border p-6 card-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <span className={stat.color}>{stat.icon}</span>
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
  );
};
