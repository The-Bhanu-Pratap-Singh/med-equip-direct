import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { ProductsManager } from "@/components/admin/ProductsManager";
import { OrdersManager } from "@/components/admin/OrdersManager";
import { QuotationsManager } from "@/components/admin/QuotationsManager";
import { CustomersManager } from "@/components/admin/CustomersManager";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "products":
        return <ProductsManager />;
      case "orders":
        return <OrdersManager />;
      case "quotations":
        return <QuotationsManager />;
      case "customers":
        return <CustomersManager />;
      case "analytics":
        return (
          <div className="bg-card rounded-2xl border p-8 text-center text-muted-foreground">
            Analytics dashboard coming soon
          </div>
        );
      case "settings":
        return (
          <div className="bg-card rounded-2xl border p-8 text-center text-muted-foreground">
            Settings panel coming soon
          </div>
        );
      default:
        return <DashboardStats />;
    }
  };

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </AdminLayout>
  );
};

export default Admin;
