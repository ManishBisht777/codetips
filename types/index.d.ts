interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

interface NavbarConfig {
  mainNav: NavItem[];
}
