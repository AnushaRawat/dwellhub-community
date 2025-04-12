import React, { createContext, useContext, useState } from "react";

interface AdminContextType {
  isAdmin: boolean;
  login: (isAdmin: boolean) => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useAdmin() {
  console.warn("useAdmin is deprecated. Please use useAuth().isAdmin instead");
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
