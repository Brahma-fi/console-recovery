import { ethers } from "ethers";
import { TxBuilder } from "@morpho-labs/gnosis-tx-builder";
import { saveAs } from "file-saver";
import { ADDRESS_0, ADDRESS_1, WALLET_REGISTRY } from "@/app/config/blockchain";
import safeAbi from "@/app/abi/safeAbi.json";
import walletRegistryAbi from "@/app/abi/walletRegAbi.json";

/**
 * Get main Safe configuration (owners and threshold)
 */
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

/**
 * Get all subaccounts for a console Safe address
 */
export const getConsoleSubaccounts = async (
  consoleSafe: string,
  provider: ethers.providers.JsonRpcProvider
): Promise<string[]> => {
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
    console.error("Error fetching subaccounts:", err);
    return [];
  }
};

/**
 * Generate recovery transaction JSON for selected subaccounts
 */
export const generateTxnJson = async (
  consoleSafe: string,
  subaccounts: string[],
  provider: ethers.providers.JsonRpcProvider
) => {
  console.log("Generating transaction JSON...");

  // Get main safe configuration
  const { mainOwners, mainThreshold } = await getMainSafeConfig(
    consoleSafe,
    provider
  );
  console.log("Main safe config:", { mainOwners, mainThreshold });

  const transactions = [];

  // For each subaccount, generate recovery transactions
  for (const subaccount of subaccounts) {
    const subaccountSafeContract = new ethers.Contract(
      subaccount,
      safeAbi,
      provider
    );

    // Get current operators (owners)
    const subaccountOperators = await subaccountSafeContract.getOwners();
    console.log(`Subaccount ${subaccount} operators:`, subaccountOperators);

    // 1. Remove all operators except first one
    for (let i = subaccountOperators.length - 1; i > 0; i--) {
      const removeOwnerCalldata =
        subaccountSafeContract.interface.encodeFunctionData("removeOwner", [
          subaccountOperators[i - 1], // prevOwner
          subaccountOperators[i], // owner to remove
          1, // threshold
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

    // 2. Swap first operator with main owner
    const swapOwnerCalldata =
      subaccountSafeContract.interface.encodeFunctionData("swapOwner", [
        ADDRESS_1, // sentinel address
        subaccountOperators[0], // old owner
        mainOwners[0], // new owner
      ]);

    transactions.push({
      to: subaccount,
      value: "0",
      data: subaccountSafeContract.interface.encodeFunctionData(
        "execTransactionFromModule",
        [subaccount, 0, swapOwnerCalldata, 0]
      ),
    });

    // 3. Add remaining main owners
    for (let i = 1; i < mainOwners.length; i++) {
      // Set threshold on last owner addition
      const tempThreshold = i === mainOwners.length - 1 ? mainThreshold : 1;

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

    // 4. Remove guard (disable Console policies)
    const removeGuardCalldata =
      subaccountSafeContract.interface.encodeFunctionData("setGuard", [
        ADDRESS_0, // zero address = no guard
      ]);

    transactions.push({
      to: subaccount,
      value: "0",
      data: subaccountSafeContract.interface.encodeFunctionData(
        "execTransactionFromModule",
        [subaccount, 0, removeGuardCalldata, 0]
      ),
    });
  }

  // Create description for the batch transaction
  const description = `This script allows the recovery and full control of subaccount/s ${subaccounts.join(
    ", "
  )} linked to Console Safe ${consoleSafe}. It removes all operators from the specified subaccount/s and transfers ownership to the Main Account owners. Additionally, it deactivates the Console policy and on-chain SafeGuard for these subaccount/s.

WARNING: Use this script cautiously. Executing it will disable existing policies and operator permissions, making the subaccount/s directly manageable only by Main Account owners. This action is irreversible and ensures complete control over the subaccount/s without Console-imposed restrictions.`;

  // Create batch transaction JSON using TxBuilder
  const batchJson = TxBuilder.batch(consoleSafe, transactions, {
    chainId: provider.network.chainId,
    name: `Console Safe ${consoleSafe} Subaccount Recovery`,
    description,
  });

  console.log("Generated JSON:", batchJson);

  // Download JSON file
  const jsonBlob = new Blob([JSON.stringify(batchJson, null, 2)], {
    type: "application/json",
  });

  saveAs(jsonBlob, `Console_Safe_${consoleSafe}_Subaccount_Recovery.json`);
};
