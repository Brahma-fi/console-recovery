import Header from "@/components/Header";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const AVAILABLE_CHAINS = {
  mainnet: "homestead",
  arbitrum: "arbitrum",
};

type UserSelection = {
  consoleAddress: string;
  selectedChain: string;
  selectedSubaccount: string;
};

export default function Home() {
  const [userSelection, setUserSelection] = useState<UserSelection>({
    consoleAddress: "",
    selectedChain: AVAILABLE_CHAINS.mainnet,
    selectedSubaccount: "",
  });

  const setConsoleAddressHandler = (consoleAddress: string) => {
    setUserSelection((prev) => ({ ...prev, consoleAddress }));
  };
  const setChainHandler = (chain: string) => {
    setUserSelection((prev) => ({ ...prev, selectedChain: chain }));
  };

  return (
    <main className="px-[8rem] py-[8rem]">
      <Header
        consoleAddress={userSelection.consoleAddress}
        selectedChain={userSelection.selectedChain}
        setConsoleAddress={setConsoleAddressHandler}
        setChain={setChainHandler}
      />
    </main>
  );
}
