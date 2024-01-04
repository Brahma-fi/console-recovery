import { ethers, constants } from "ethers";
import { TxBuilder } from "@morpho-labs/gnosis-tx-builder";
import safeAbi from "../abi/safeAbi.json";
import walletRegistryAbi from "../abi/walletRegAbi.json";
import { ADDRESS_0, ADDRESS_1, WALLET_REGISTRY } from "./constants";
import { saveAs } from "file-saver";

export const generateTxnJson = async (
  consoleSafe: string,
  subaccounts: string[],
  provider: ethers.providers.JsonRpcProvider
) => {
  console.log("entered generateTxnJson");
  const { mainOwners, mainThreshold } = await getMainSafeConfig(
    consoleSafe,
    provider
  );
  console.log("got main safe config");

  let transactions = [];

  for (let subaccount of subaccounts) {
    const subaccountSafeContract = new ethers.Contract(
      subaccount,
      safeAbi,
      provider
    );
    const subaccountOperators = await subaccountSafeContract.getOwners();

    console.log(subaccountOperators);

    for (let i = subaccountOperators.length - 1; i > 0; i--) {
      console.log(subaccountOperators[i]);

      const removeOwnerCalldata =
        subaccountSafeContract.interface.encodeFunctionData("removeOwner", [
          subaccountOperators[i - 1],
          subaccountOperators[i],
          1,
        ]);

      transactions.push({
        to: subaccount,
        value: "0",
        data: subaccountSafeContract.interface.encodeFunctionData(
          "execTransactionFromModule",
          [subaccount, 0, removeOwnerCalldata, 0]
        ),
      });
    }

    const swapOwnerCalldata =
      subaccountSafeContract.interface.encodeFunctionData("swapOwner", [
        ADDRESS_1,
        subaccountOperators[0],
        mainOwners[0],
      ]);

    transactions.push({
      to: subaccount,
      value: "0",
      data: subaccountSafeContract.interface.encodeFunctionData(
        "execTransactionFromModule",
        [subaccount, 0, swapOwnerCalldata, 0]
      ),
    });

    for (let i = 1; i < mainOwners.length; i++) {
      const tempThreshold = i == mainOwners.length - 1 ? mainThreshold : 1;

      const addOwnerCalldata =
        subaccountSafeContract.interface.encodeFunctionData(
          "addOwnerWithThreshold",
          [mainOwners[i], tempThreshold]
        );
      transactions.push({
        to: subaccount,
        value: "0",
        data: subaccountSafeContract.interface.encodeFunctionData(
          "execTransactionFromModule",
          [subaccount, 0, addOwnerCalldata, 0]
        ),
      });
    }

    const removeGuardCalldata = subaccountSafeContract.interface.encodeFunctionData("setGuard", [ADDRESS_0])
    transactions.push({
      to: subaccount,
      value: "0",
      data: subaccountSafeContract.interface.encodeFunctionData(
        "execTransactionFromModule",
        [subaccount, 0, removeGuardCalldata, 0]
      ),
    });
  }

  const batchJson = TxBuilder.batch(consoleSafe, transactions, {
    chainId: provider.network.chainId,
    name: `Console Safe ${consoleSafe} Subaccount Recovery`,
    description: `Recover complete control over the subaccounts of console safe ${consoleSafe} by removing all operators and swapping the owner to the main safe owner. WARNING: Proceed with caution, this will remove any and all policies on the subaccount and make it impossible for operators to use the subaccount anymore.`,
  });

  console.log("JSON", batchJson);

  const jsonBlob = new Blob([JSON.stringify(batchJson)], {
    type: "application/json",
  });

  saveAs(jsonBlob, `Console_Safe_${consoleSafe}_Subaccount_Recovery.json`);
};

export const getMainSafeConfig = async (
  consoleSafe: string,
  provider: ethers.providers.JsonRpcProvider
) => {
  const consoleSafeContract = new ethers.Contract(
    consoleSafe,
    safeAbi,
    provider
  );

  const mainOwners = await consoleSafeContract.getOwners();
  const mainThreshold = await consoleSafeContract.getThreshold();

  return { mainOwners, mainThreshold };
};

export const getConsoleSubaccounts = async (
  consoleSafe: string,
  provider: ethers.providers.JsonRpcProvider
) => {
  console.log({ provider });
  console.log({ consoleSafe });
  try {
    const walletRegistryContract = new ethers.Contract(
      WALLET_REGISTRY,
      walletRegistryAbi,
      provider
    );

    const subaccounts = await walletRegistryContract.getSubAccountsForWallet(
      consoleSafe
    );

    return subaccounts;
  } catch (err) {
    console.error(err);
    return [];
  }
};
