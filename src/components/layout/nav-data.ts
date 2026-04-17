export interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}

export const productDropdownItems: NavDropdownItem[] = [
  {
    label: "Business Phone System",
    href: "/",
    description: "Make and receive calls with a reliable cloud phone system",
    icon: "/phone-call-icon.svg",
  },
  {
    label: "Send and Receive SMS",
    href: "/",
    description: "Respond to and manage texts with full CRM visibility",
    icon: "/messages-icon.svg",
  },
  {
    label: "Automated Dialers",
    href: "/",
    description: "Reach more prospects with power and 10-line predictive dialers",
    icon: "/phone-calling-icon.svg",
  },
];

export const solutionsDropdownItems: NavDropdownItem[] = [
  {
    label: "Sales Teams",
    href: "/",
    description: "Outbound calling for closers",
    icon: "/phone-call-icon.svg",
  },
  {
    label: "Support Teams",
    href: "/",
    description: "Resolve faster with context",
    icon: "/messages-icon.svg",
  },
  {
    label: "Remote Teams",
    href: "/",
    description: "Stay connected everywhere",
    icon: "/phone-calling-icon.svg",
  },
];
