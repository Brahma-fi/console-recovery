"use client";

import { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { ConsoleInput } from "@/app/components/safe-recovery/console-input";
import { SubaccountsList } from "@/app/components/safe-recovery/subaccounts-list";
import {
  generateTxnJson,
  getConsoleSubaccounts,
} from "@/app/lib/blockchain-actions";
import { PUBLIC_RPCS, type ChainName } from "@/app/config/blockchain";

type UserSelection = {
  consoleAddress: string;
  selectedChain: ChainName;
  selectedSubaccounts: string[];
};

export default function SafeRecoveryForm() {
  const [userSelection, setUserSelection] = useState<UserSelection>({
    consoleAddress: "",
    selectedChain: "Ethereum",
    selectedSubaccounts: [],
  });

  const [subaccounts, setSubaccounts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Create provider based on selected chain
  const provider = useMemo(() => {
    const rpcUrl =
      PUBLIC_RPCS[userSelection.selectedChain] ?? PUBLIC_RPCS.Ethereum;
    return new ethers.providers.JsonRpcProvider(rpcUrl);
  }, [userSelection.selectedChain]);

  // Handlers
  const setConsoleAddressHandler = (consoleAddress: string) => {
    setUserSelection((prev) => ({ ...prev, consoleAddress }));
  };

  const setChainHandler = (chain: ChainName) => {
    setUserSelection((prev) => ({
      ...prev,
      selectedChain: chain,
      selectedSubaccounts: [], // Reset selections on chain change
    }));
    setSubaccounts([]); // Clear subaccounts on chain change
  };

  // Fetch subaccounts when console address or chain changes
  useEffect(() => {
    if (!isAddress(userSelection.consoleAddress) || !provider) return;

    const fetchSubaccounts = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching subaccounts for:", userSelection.consoleAddress);
        console.log("Chain:", userSelection.selectedChain);

        const accounts = await getConsoleSubaccounts(
          userSelection.consoleAddress,
          provider
        );

        setSubaccounts(accounts);
        setUserSelection((prev) => ({ ...prev, selectedSubaccounts: [] }));
      } catch (error) {
        console.error("Error fetching subaccounts:", error);
        setSubaccounts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubaccounts();
  }, [userSelection.consoleAddress, provider, userSelection.selectedChain]);

  // Toggle subaccount selection
  const selectSubAccountHandler = (subaccount: string) => {
    const isSelected = userSelection.selectedSubaccounts.includes(subaccount);

    if (isSelected) {
      setUserSelection((prev) => ({
        ...prev,
        selectedSubaccounts: prev.selectedSubaccounts.filter(
          (address) => address !== subaccount
        ),
      }));
    } else {
      setUserSelection((prev) => ({
        ...prev,
        selectedSubaccounts: [...prev.selectedSubaccounts, subaccount],
      }));
    }
  };

  // Download JSON handler
  const onDownloadClickHandler = async () => {
    const { consoleAddress, selectedSubaccounts } = userSelection;

    if (!isAddress(consoleAddress) || selectedSubaccounts.length === 0) {
      console.log("Invalid console address or no subaccounts selected");
      return;
    }

    setIsDownloading(true);
    try {
      await generateTxnJson(consoleAddress, selectedSubaccounts, provider);
    } catch (error) {
      console.error("Error generating transaction JSON:", error);
      alert(
        "Error generating transaction JSON. Please check console for details."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Console Input Section */}
      <ConsoleInput
        consoleAddress={userSelection.consoleAddress}
        selectedChain={userSelection.selectedChain}
        onAddressChange={setConsoleAddressHandler}
        onChainChange={setChainHandler}
      />

      {/* Subaccounts List Section */}
      <SubaccountsList
        userInput={userSelection.consoleAddress}
        subaccounts={subaccounts}
        selectedAccounts={userSelection.selectedSubaccounts}
        onSelectAccount={selectSubAccountHandler}
        onDownloadClick={onDownloadClickHandler}
        isLoading={isLoading}
        isDownloading={isDownloading}
      />
    </div>
  );
}
