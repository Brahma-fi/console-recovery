"use client";

import { AVAILABLE_CHAINS, ChainName } from "@/app/config/blockchain";

interface ConsoleInputProps {
  consoleAddress: string;
  selectedChain: ChainName;
  onAddressChange: (address: string) => void;
  onChainChange: (chain: ChainName) => void;
}

export function ConsoleInput({
  consoleAddress,
  selectedChain,
  onAddressChange,
  onChainChange,
}: ConsoleInputProps) {
  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Description */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-text-primary">
          Brahma Console Sub-Account Safe Detachment Tool
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed">
          Welcome to the Brahma Console Sub-Account Safe Recovery Page. This
          tool offers a simplified and efficient way to generate the necessary
          transaction file in JSON format for removing guards and policies from
          your Sub-Account Safes in a single batched transaction, fully
          compatible with the official Safe Transaction Builder at{" "}
          <a
            href="https://app.safe.global/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-primary hover:text-accent-hover transition-colors"
          >
            https://app.safe.global/
          </a>
          .
        </p>
      </div>

      {/* Input Fields */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Console Address Input */}
        <div className="flex-1">
          <input
            type="text"
            className="w-full bg-background-card border border-text-muted text-text-primary text-sm rounded-lg focus:ring-2 focus:ring-accent-primary focus:border-accent-primary p-3 transition-all"
            placeholder="Enter console address (0x...)"
            value={consoleAddress}
            onChange={(e) => onAddressChange(e.target.value)}
          />
        </div>

        {/* Chain Selector */}
        <div className="md:w-48">
          <select
            className="w-full bg-background-card border border-text-muted text-text-primary text-sm rounded-lg focus:ring-2 focus:ring-accent-primary focus:border-accent-primary p-3 transition-all cursor-pointer"
            value={selectedChain}
            onChange={(e) => onChainChange(e.target.value as ChainName)}
          >
            {Object.keys(AVAILABLE_CHAINS).map((chain) => (
              <option key={chain} value={chain}>
                {chain}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
