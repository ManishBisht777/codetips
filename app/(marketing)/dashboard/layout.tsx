import { DashboardNav } from "@/components/layout/side-bar";
import React from "react";
import { sidebarConfig } from "../../../config/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] mt-4">
      <aside className="hidden w-[200px] flex-col md:flex">
        <DashboardNav items={sidebarConfig.sidebar} />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
