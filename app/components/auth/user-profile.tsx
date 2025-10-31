"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/app/components/ui/button";

export function UserProfile() {
  const { ready, authenticated, user, logout, exportWallet, linkEmail } =
    usePrivy();

  if (!ready || !authenticated || !user) {
    return null;
  }

  const userEmail = user.email?.address || user.google?.email || "Anonymous";
  const walletAddress = user.wallet?.address;

  const handleExportWallet = async () => {
    try {
      // Opens Privy's export wallet modal with Copy Key and Copy Phrase options
      await exportWallet();
    } catch (error) {
      console.error("Error exporting wallet:", error);
      // If MFA is required, user needs to set it up in Privy Dashboard
      alert(
        "Please check your Privy Dashboard settings to disable MFA requirement for wallet export."
      );
    }
  };

  return (
    <div className="w-full max-w-md bg-background-card rounded-xl p-6 space-y-4">
      <h2 className="text-2xl font-bold text-accent-primary">
        Account Connected
      </h2>

      <div className="space-y-3">
        <div>
          <p className="text-text-muted text-sm">Email</p>
          <p className="text-text-primary font-mono">{userEmail}</p>
        </div>

        {walletAddress && (
          <div>
            <p className="text-text-muted text-sm">Wallet Address</p>
            <p className="text-text-primary font-mono text-sm truncate">
              {walletAddress}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Button onClick={handleExportWallet} fullWidth>
          <KeyIcon />
          Export Private Key
        </Button>

        <Button onClick={logout} variant="secondary" fullWidth>
          Disconnect
        </Button>
      </div>
    </div>
  );
}

function KeyIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.65 10C11.7 7.31 8.9 5.5 5.77 6.12C3.48 6.58 1.62 8.41 1.14 10.7C0.32 14.57 3.26 18 7 18C9.61 18 11.83 16.33 12.65 14H16V18H20V14H22V10H12.65ZM7 14C5.9 14 5 13.1 5 12C5 10.9 5.9 10 7 10C8.1 10 9 10.9 9 12C9 13.1 8.1 14 7 14Z"
        fill="currentColor"
      />
    </svg>
  );
}
