"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ConsoleLogo from "@/app/components/icons/ConsoleLogo";

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b border-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <ConsoleLogo width={32} height={32} color="#a5f3fc" />
            <span className="text-xl font-bold text-text-primary">Brahma</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive("/")
                  ? "bg-accent-primary text-background-primary"
                  : "text-text-secondary hover:text-text-primary hover:bg-background-card"
              }`}
            >
              Safe Recovery
            </Link>
            <Link
              href="/wallet-export"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive("/wallet-export")
                  ? "bg-accent-primary text-background-primary"
                  : "text-text-secondary hover:text-text-primary hover:bg-background-card"
              }`}
            >
              Wallet Export
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
