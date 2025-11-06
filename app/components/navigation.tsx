"use client";

import Link from "next/link";
import Image from "next/image";
import { NAV_IDS } from "../config/constants";

// Navigation items configuration
const NAV_ITEMS = [
  {
    label: "Sub-Account recovery",
    href: `/#${NAV_IDS.SUBACCOUNT_RECOVER}`,
  },
  {
    label: "Mail login",
    href: `/#${NAV_IDS.MAIL_LOGIN}`,
  },
] as const;

// Reusable NavLink component
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-white text-sm font-medium leading-6 underline decoration-solid"
    >
      {label}
    </Link>
  );
}

export function Navigation() {
  return (
    <nav className="border-b border-background-secondary">
      <div className="max-w-7xl md:max-w-full mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              src="/icons/BrahmaLogoWithName.png"
              alt="Brahma Logo"
              width={120}
              height={32}
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-6 md:hidden">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Export NAV_IDS for use in other components
export { NAV_IDS };
