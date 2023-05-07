import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
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
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default exploreLayout;
