// Blockchain configuration for Safe Recovery
// Config at top for easy modifications

import {
  arbitrum,
  base,
  berachain,
  blast,
  mainnet,
  mode,
  optimism,
  sei,
  swellchain,
} from "viem/chains";

// Wallet Registry contract address (same across all chains)
export const WALLET_REGISTRY = "0x27fbc3310907c0425Ea09115397a40DddC154641";

// Special addresses used in Safe operations
export const ADDRESS_1 = "0x0000000000000000000000000000000000000001"; // Sentinel address
export const ADDRESS_0 = "0x0000000000000000000000000000000000000000"; // Zero address

// Available blockchain networks
export const AVAILABLE_CHAINS = {
  Ethereum: "Ethereum",
  Arbitrum: "Arbitrum",
  Blast: "Blast",
  Mode: "Mode",
  Sei: "Sei",
  Base: "Base",
  Scroll: "Scroll",
  Swell: "Swell",
  Berachain: "Berachain",
  Optimism: "Optimism",
} as const;

export type ChainName = keyof typeof AVAILABLE_CHAINS;

// Public RPC endpoints for each chain
export const PUBLIC_RPCS: Record<ChainName, string> = {
  Ethereum: mainnet.rpcUrls.default.http[0],
  Arbitrum: arbitrum.rpcUrls.default.http[0],
  Blast: blast.rpcUrls.default.http[0],
  Mode: mode.rpcUrls.default.http[0],
  Sei: sei.rpcUrls.default.http[0],
  Base: base.rpcUrls.default.http[0],
  Scroll: "https://scroll.drpc.org",
  Swell: swellchain.rpcUrls.default.http[0],
  Berachain: berachain.rpcUrls.default.http[0],
  Optimism: optimism.rpcUrls.default.http[0],
} as const;
