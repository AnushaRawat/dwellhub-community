
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminUserManagement } from "@/components/admin/AdminUserManagement";

export default function AdminUsersPage() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to access the admin area");
      navigate("/auth?redirect=/admin/users");
    } else if (!isAdmin) {
      toast.error("You don't have access to the admin area");
      navigate("/home");
    }
  }, [user, isAdmin, navigate]);

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 pt-20 pb-16 px-4 lg:pl-8 max-w-screen-2xl mx-auto">
          <div className="space-y-8 p-6">
            <h1 className="text-3xl font-bold">User Management</h1>
            <AdminUserManagement />
          </div>
        </div>
      </div>
    </div>
  );
}
