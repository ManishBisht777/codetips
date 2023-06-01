import { DashboardConfig, NavbarConfig } from "@/types";

export const navbarConfig: NavbarConfig = {
  mainNav: [
    {
      title: "Features",
      href: "/#features",
    },
    {
      title: "Explore",
      href: "/explore",
    },
    {
      title: "Subscription",
      href: "/dashboard/billing",
    },
  ],
};

export const sidebarConfig: DashboardConfig = {
  sidebar: [
    {
      title: "Posts",
      icon: "post",
      href: "/dashboard",
    },
    {
      title: "Billing",
      icon: "billing",
      href: "/dashboard/billing",
    },
    {
      title: "Edit Profile",
      icon: "write",
      href: "/dashboard/edit",
    },
  ],
};
