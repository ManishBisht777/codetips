import { Icons } from "@/components/icons";
import { Post, User } from "@prisma/client";

interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

interface NavbarConfig {
  mainNav: NavItem[];
}

export type SidebarNavItem = {
  title: string;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type DashboardConfig = {
  sidebar: SidebarNavItem[];
};

interface PostAuthor {
  author: Pick<User, "email" | "name" | "image">;
}

interface PostWithUser extends Post, PostAuthor {}

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number;
    isPro: boolean;
  };
