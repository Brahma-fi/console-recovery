import Header from "@/components/Header";
import SubAccountsView from "@/components/SubAccountsView/indes";
import { generateTxnJson, getConsoleSubaccounts } from "@/config/actions";
import { ethers } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { useEffect, useMemo, useState } from "react";

export const AVAILABLE_CHAINS = {
  mainnet: "homestead",
  arbitrum: "arbitrum",
};

type UserSelection = {
  consoleAddress: string;
  selectedChain: string;
  selectedSubaccounts: string[];
};

export default function Home() {
  const [userSelection, setUserSelection] = useState<UserSelection>({
    consoleAddress: "",
    selectedChain: AVAILABLE_CHAINS.mainnet,
    selectedSubaccounts: [],
  });

  const [subaccount, setSubaccounts] = useState<string[]>([]);

  const provider = useMemo(() => {
    return (
      new ethers.providers.AlchemyProvider(
        userSelection.selectedChain,
        process.env.NEXT_PUBLIC_PROVIDER_API
      ) || null
    );
  }, [userSelection.selectedChain]);

  const setConsoleAddressHandler = (consoleAddress: string) => {
    setUserSelection((prev) => ({ ...prev, consoleAddress }));
  };
  const setChainHandler = (chain: string) => {
    setUserSelection((prev) => ({ ...prev, selectedChain: chain }));
  };

  useEffect(() => {
    if (!isAddress(userSelection.consoleAddress) || !provider) return;
    const getSubaccounts = async () => {
      console.log("effect provider", provider);
      console.log("effect chain", userSelection.selectedChain);
      const subaccounts = await getConsoleSubaccounts(
        userSelection.consoleAddress,
        provider
      );
      setSubaccounts(subaccounts);
    };
    getSubaccounts();
  }, [userSelection.consoleAddress, provider, userSelection.selectedChain]);

  const selectSubAccountHandler = (subaccount: string) => {
    const userSelectedSubaccounts = userSelection.selectedSubaccounts;
    const isExisting = userSelectedSubaccounts.includes(subaccount);

    if (isExisting) {
      setUserSelection((prev) => ({
        ...prev,
        selectedSubaccounts: prev.selectedSubaccounts.filter(
          (address) => address !== subaccount
        ),
      }));
      return;
    }
    setUserSelection((prev) => ({
      ...prev,
      selectedSubaccounts: [...prev.selectedSubaccounts, subaccount],
    }));
  };

  const onDownloadClickHandler = async () => {
    const { consoleAddress, selectedChain, selectedSubaccounts } =
      userSelection;
    if (
      !process.env.NEXT_PUBLIC_PROVIDER_API ||
      !isAddress(consoleAddress) ||
      selectedSubaccounts.length === 0
    )
      return;

    await generateTxnJson(consoleAddress, selectedSubaccounts, provider);
  };

  return (
    <main className="px-[6rem] py-[4rem]">
      <Header
        consoleAddress={userSelection.consoleAddress}
        selectedChain={userSelection.selectedChain}
        setConsoleAddress={setConsoleAddressHandler}
        setChain={setChainHandler}
      />
      <SubAccountsView
        onDownloadClick={onDownloadClickHandler}
        subaccounts={subaccount}
        selectAccount={selectSubAccountHandler}
        selectedAccounts={userSelection.selectedSubaccounts}
      />
    </main>
  );
}
