"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { PRIVY_APP_ID } from "@/app/config/constants";

export function PrivyClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        // Appearance customization to match Brahma theme
        appearance: {
          theme: "dark",
          accentColor: "#a5f3fc",
          logo: "/icons/brahma-logo.png",
        },
        // Login methods
        loginMethods: ["wallet", "email", "google"],
        // Embedded wallet configuration - configure for Ethereum and Solana
      }}
    >
      {children}
    </PrivyProvider>
  );
}
