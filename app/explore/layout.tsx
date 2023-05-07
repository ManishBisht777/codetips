import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import ProfileCard from "@/components/profile-card";
import { buttonVariants } from "@/components/ui/button";
import { navbarConfig } from "@/config/navbar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type exploreLayoutProps = {
  children: React.ReactNode;
};

const exploreLayout = ({ children }: exploreLayoutProps) => {
  return (
    <div className="min-h-screen flex-col flex">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <Navbar items={navbarConfig.mainNav} />
          <nav>
            <Link
              href="/"
              className={cn(buttonVariants({ size: "sm" }), "px-4")}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <div className="mt-3 container flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[260px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-10rem)] w-full shrink-0 overflow-y-auto  md:sticky md:block lg:py-2">
          {/* <SidebarNav items={courseConfig.sidebarNav} /> */}
          <ProfileCard />
        </aside>
        {children}
      </div>
    </div>
  );
};

export default exploreLayout;
