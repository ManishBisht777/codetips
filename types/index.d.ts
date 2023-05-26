import { Post } from "@prisma/client";

interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

interface NavbarConfig {
  mainNav: NavItem[];
}

interface PostAuthor {
  author: Pick<User, "email" | "name" | "image">;
}

interface PostWithUser extends Post, PostAuthor {}
