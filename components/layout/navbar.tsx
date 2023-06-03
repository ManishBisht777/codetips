"use client";

import Link from "next/link";
import React from "react";
import { Icons } from "../icons";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { MobileNav } from "./mobile-nav";

type Props = {
  items?: NavItem[];
  children?: React.ReactNode;
};

const MainNav = ({ items, children }: Props) => {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo />
        <span className="hidden text-lg font-bold sm:inline-block">
          Tipsycode
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden md:flex gap-6">
          {items?.map((item, index) => {
            return (
              <Link
                href={item.href}
                key={index}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                  item.href.startsWith(`/${segment}`)
                    ? "text-foreground"
                    : "text-foreground/60",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
};

export default MainNav;
