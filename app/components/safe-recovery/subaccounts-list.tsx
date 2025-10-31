"use client";

import { Button } from "@/app/components/ui/button";

interface SubaccountsListProps {
  subaccounts: string[];
  selectedAccounts: string[];
  onSelectAccount: (account: string) => void;
  onDownloadClick: () => void;
  isLoading?: boolean;
}

export function SubaccountsList({
  subaccounts,
  selectedAccounts,
  onSelectAccount,
  onDownloadClick,
  isLoading = false,
}: SubaccountsListProps) {
  const isDownloadDisabled = selectedAccounts.length === 0;

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Subaccounts Container */}
      <div className="bg-background-card rounded-xl p-6 border border-text-muted/20 max-h-[30rem] overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
            <span className="ml-3 text-text-secondary">
              Loading subaccounts...
            </span>
          </div>
        ) : subaccounts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-text-muted">
              No subaccounts found for this console address
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {subaccounts.map((subaccount) => (
              <SubaccountItem
                key={subaccount}
                address={subaccount}
                isSelected={selectedAccounts.includes(subaccount)}
                onSelect={() => onSelectAccount(subaccount)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <Button
          onClick={onDownloadClick}
          disabled={isDownloadDisabled}
          fullWidth={false}
          className="px-8"
        >
          <DownloadIcon />
          Download JSON
        </Button>
      </div>
    </div>
  );
}

interface SubaccountItemProps {
  address: string;
  isSelected: boolean;
  onSelect: () => void;
}

function SubaccountItem({
  address,
  isSelected,
  onSelect,
}: SubaccountItemProps) {
  return (
    <div
      className="flex items-center gap-4 p-3 rounded-lg hover:bg-background-secondary transition-colors cursor-pointer"
      onClick={onSelect}
    >
      {/* Checkbox */}
      <div
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
          isSelected
            ? "bg-accent-primary border-accent-primary"
            : "border-text-muted hover:border-accent-primary"
        }`}
      >
        {isSelected && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke="#0a0a0a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Address */}
      <p className="text-text-primary font-mono text-sm flex-1">{address}</p>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 10L12 15L17 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
