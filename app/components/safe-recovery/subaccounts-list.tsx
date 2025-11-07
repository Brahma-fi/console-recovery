"use client";

import { isAddress } from "viem";

interface SubaccountsListProps {
  userInput: string;
  subaccounts: string[];
  selectedAccounts: string[];
  onSelectAccount: (account: string) => void;
  onDownloadClick: () => void;
  isLoading?: boolean;
  isDownloading?: boolean;
}

export function SubaccountsList({
  userInput,
  subaccounts,
  selectedAccounts,
  onSelectAccount,
  onDownloadClick,
  isLoading = false,
  isDownloading = false,
}: SubaccountsListProps) {
  const isDownloadDisabled = selectedAccounts.length === 0 || isDownloading;

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Download Button */}
      <div className="flex justify-center">
        <button
          onClick={onDownloadClick}
          disabled={isDownloadDisabled}
          className={`flex w-full px-2 py-2 justify-center items-center rounded-lg text-sm font-medium leading-6 transition-all ${
            isDownloadDisabled
              ? "bg-[#494C56] text-[#A8ADB5] cursor-not-allowed gap-1"
              : "bg-white text-black cursor-pointer gap-[6px]"
          }`}
        >
          {isDownloading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-black"></div>
              Generating...
            </>
          ) : (
            <>
              <DownloadIcon disabled={isDownloadDisabled} />{" "}
              {selectedAccounts.length > 0
                ? ` Download Json file (${selectedAccounts.length} Selected)`
                : userInput
                ? "Select Sub-Accounts to download JSON"
                : "Enter Account Address to view Sub-Accounts"}
            </>
          )}
        </button>
      </div>
      {/* Subaccounts Container */}
      {!isAddress(userInput) ? (
        // Placeholder when no input
        <div className="flex py-7 px-2 justify-center items-center gap-1 self-stretch rounded-lg border border-dashed border-[#343436]">
          <p className="text-[#494C56] text-sm font-medium leading-6">
            Sub-Accounts list
          </p>
        </div>
      ) : (
        // Show when valid address is entered
        <div className="bg-[#18181C] rounded-xl p-6 border border-text-muted/20 max-h-120 overflow-auto">
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
                No Sub-Accounts found for this Brahma Account address
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
      )}
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
      className="flex flex-row items-center gap-4 p-3 rounded-lg hover:bg-[#252527] transition-colors cursor-pointer"
      onClick={onSelect}
      style={{ wordBreak: "break-all" }}
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
      <p className="text-text-primary font-mono text-xs sm:text-sm flex-1 break-all hidden md:block ">
        {address.slice(0, 15)}...{address.slice(-15)}
      </p>{" "}
      <p className="text-text-primary font-mono text-xs sm:text-sm flex-1 break-all md:hidden">
        {address.slice(0, 10)}...{address.slice(-10)}
      </p>
    </div>
  );
}

function DownloadIcon({ disabled }: { disabled: boolean }) {
  const color = disabled ? "#A8ADB5" : "#000000";

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
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 10L12 15L17 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15V3"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
