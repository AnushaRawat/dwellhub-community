
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ServiceManagement } from "@/components/admin/ServiceManagement";

export default function AdminServicesPage() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // First check if user is logged in
    if (!user) {
      toast.error("You must be logged in to access the admin area");
      navigate("/auth?redirect=/admin/services");
      return;
    }
    
    // Then check if user is admin
    if (!isAdmin) {
      toast.error("You don't have access to the admin area");
      navigate("/home");
    }
  }, [user, isAdmin, navigate]);

  // Don't render anything if not authorized
  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 pt-20 pb-16 px-4 lg:pl-8 max-w-screen-2xl mx-auto">
          <div className="space-y-8 p-6">
            <h1 className="text-3xl font-bold">Service Requests Management</h1>
            <ServiceManagement />
          </div>
        </div>
      </div>
    </div>
  );
}
