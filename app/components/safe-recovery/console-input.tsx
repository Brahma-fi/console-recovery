"use client";

import { AVAILABLE_CHAINS, ChainName } from "@/app/config/blockchain";
import ArrowDownIcon from "../icons/ArrowDownIcon";

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
      {/* Input Fields */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Console Address Input */}
        <input
          type="text"
          className="flex items-center px-3 py-2 gap-1 flex-1 rounded-lg border border-[#494C56] bg-[#0D0D10] text-white text-sm focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all"
          placeholder="Paste your Brahma Account address"
          value={consoleAddress}
          onChange={(e) => onAddressChange(e.target.value)}
        />

        {/* Chain Selector */}
        <div className="relative w-[138px] shrink-0">
          <select
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-[#494C56] bg-[#292930] text-white text-sm focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all cursor-pointer appearance-none pr-8"
            value={selectedChain}
            onChange={(e) => onChainChange(e.target.value as ChainName)}
          >
            {Object.keys(AVAILABLE_CHAINS).map((chain) => (
              <option key={chain} value={chain}>
                {chain}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ArrowDownIcon width={16} height={16} color="#E6E8ED" />
          </div>
        </div>
      </div>
    </div>
  );
}
