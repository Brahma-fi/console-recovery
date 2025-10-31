// Blockchain configuration for Safe Recovery
// Config at top for easy modifications

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
} as const;

export type ChainName = keyof typeof AVAILABLE_CHAINS;

// Public RPC endpoints for each chain
export const PUBLIC_RPCS: Record<ChainName, string> = {
  Ethereum: "https://eth-mainnet.public.blastapi.io",
  Arbitrum: "https://arbitrum.llamarpc.com",
  Blast: "https://blast-rpc.publicnode.com",
  Mode: "https://mainnet.mode.network",
  Sei: "https://evm-rpc.sei-apis.com",
  Base: "https://base.llamarpc.com",
  Scroll: "https://scroll.drpc.org",
  Swell: "https://swell-mainnet.alt.technology",
  Berachain: "https://rpc.berachain.com",
} as const;
