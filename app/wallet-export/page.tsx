"use client";

import { usePrivy } from "@privy-io/react-auth";
import { AuthButtons } from "@/app/components/auth/auth-buttons";
import { UserProfile } from "@/app/components/auth/user-profile";

export default function WalletExport() {
  const { ready, authenticated } = usePrivy();

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <main className="w-full max-w-6xl">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Header Section */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-accent-primary">
              Wallet Export
            </h2>

            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Secure your account with multiple authentication methods. Connect
              your wallet, use email with passkeys, or sign in with Google.
            </p>
          </div>

          {/* Authentication Section */}
          <div className="w-full flex justify-center">
            {!ready ? (
              <LoadingSpinner />
            ) : authenticated ? (
              <UserProfile />
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-16 text-text-muted text-sm">
            <p>Protected by Privy • Secure • Decentralized</p>
          </div>
        </div>
      </main>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary"></div>
    </div>
  );
}
