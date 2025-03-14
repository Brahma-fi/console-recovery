import Faq from "@/components/Faq";
import Header from "@/components/Header";
import SubAccountsView from "@/components/SubAccountsView/indes";
import { generateTxnJson, getConsoleSubaccounts } from "@/config/actions";
import { PUBLIC_RPCS } from "@/config/constants";
import { ethers } from "ethers";
import { isAddress } from "ethers/lib/utils";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

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

type UserSelection = {
  consoleAddress: string;
  selectedChain: string;
  selectedSubaccounts: string[];
};

export default function Home() {
  const [userSelection, setUserSelection] = useState<UserSelection>({
    consoleAddress: "",
    selectedChain: AVAILABLE_CHAINS.Ethereum,
    selectedSubaccounts: [],
  });

  const [subaccount, setSubaccounts] = useState<string[]>([]);

  const provider = useMemo(() => {
    const rpcUrl =
      PUBLIC_RPCS[userSelection.selectedChain as keyof typeof PUBLIC_RPCS] ??
      PUBLIC_RPCS.Ethereum;

    return new ethers.providers.JsonRpcProvider(rpcUrl);
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
    console.log("download handler entered");
    const { consoleAddress, selectedChain, selectedSubaccounts } =
      userSelection;
    if (!isAddress(consoleAddress) || selectedSubaccounts.length === 0) {
      console.log("early return added");
      return;
    }

    await generateTxnJson(consoleAddress, selectedSubaccounts, provider);
  };

  return (
    <main className="px-[6rem] py-[4rem]">
      <Head>
        <title>Console recovery</title>
        <meta property="og:title" content="Console recovery" key="title" />
      </Head>
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
      <Faq />
    </main>
  );
}
