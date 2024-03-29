// type FaqProps = {}

import { useState } from "react";

export default function Faq() {
  return (
    <>
      {FaqData.map((item) => (
        <FaqItem key={item.title} title={item.title} subtitle={item.subtitle} />
      ))}
    </>
  );
}

const FaqItem = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex flex-col gap-4 py-4">
      <p
        onClick={() => setIsExpanded((prev) => !prev)}
        className="text-xl font-semibold cursor-pointer"
      >
        ▶ {title}
      </p>
      {isExpanded && <div className="">{subtitle}</div>}
    </div>
  );
};

const FaqData = [
  {
    title: "What is the Console Sub-Account Safe Detachment Tool?",
    subtitle: (
      <p>
        This tool offers a simplified and efficient way to generate the
        necessary transaction file in json format for removing guards and
        policies from your Sub-Account Safes in a single batched transaction.
        <br /> <br />
        ⦿ The transaction data prepared by the tool is fully compatible with the
        official Safe Transaction Builder for maximum accessibility.
        <br /> <br />
        ⦿ Detaching Subaccounts allows you to independently manage and transact
        on them via the Safe.global interface.
        <br /> <br />
        ⦿ This tool is not a custom software or unique process; rather, it is a
        practical solution for easily detaching multiple Sub-Accounts from your
        Main Console Safe by preparing the transaction call-data automatically.
        While it&apos;s possible for users to manually create and execute such a
        transaction on Safe.global, this tool streamlines and simplifies the
        process.
        <br /> <br />
        ⦿ Brahma never has any ownership or signature rights on your Console
        Safes. Only the Main Safe owner can execute any transaction on their
        Console Main Safe, including this module transaction for detaching
        Sub-Accounts
        <br /> <br />⦿ This tool is hosted on IPFS and fully decentralised
        Please review the usage guide below and the Brahma Console docs at{" "}
        <a
          className="text-blue-400"
          href="https://docs.brahma.fi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Brahma Docs
        </a>
      </p>
    ),
  },
  {
    title: "Usage Guide: How to detach Console Subaccounts using this tool",
    subtitle: (
      <p>
        ⦿ <strong>Input Main Console Safe Address</strong>: Start by entering
        your main Console Safe address. This is the primary address associated
        with your Brahma Console account. <br /> <br />⦿{" "}
        <strong>Automatic Sub-Account Detection</strong>: The tool will
        automatically detect all Sub-Accounts owned by your main Console Safe.{" "}
        <br /> <br />⦿ <strong>Select Sub-Accounts for Detachment</strong>:
        Choose the Sub-Accounts you wish to detach from Console. These are the
        accounts you intend to manage independently. The process will
        simultaneously: Remove the Safe guard with Console Policy, replace the
        Sub-Account operators with the Main Console Safe Owners. This makes the
        Main Console Safe Owners the Sub-Account direct owners, and removes the
        Console guard and Policy so any transaction can be executed by the
        owners. Please note the recovery/detachment transaction does not
        instruct any action related to assets on the Sub-Accounts. Open
        positions, and assets are completely excluded. <br /> <br />⦿{" "}
        <strong>Download the JSON File</strong>: After selection, download the
        JSON file generated by the tool. This file contains the necessary
        transaction call-data for detaching the selected Sub-Accounts. <br />{" "}
        <br />⦿ <strong>Visit Safe.global</strong>: Navigate to
        https://app.safe.global/ and select the “Transaction Builder” option. -{" "}
        <strong>Upload the JSON File</strong>: Drag and drop the downloaded JSON
        file into the Transaction Builder. This will prepare the transaction for
        detaching your Sub-Accounts. <br /> <br />⦿{" "}
        <strong>Simulate the Transaction</strong>: Before executing, simulate
        the transaction to ensure it processes correctly and thoroughly read and
        understand its effects. The Safe UI and Re-Define report will outline
        the steps taken. <br /> <br />⦿ <strong>Execute the Transaction</strong>
        : Confirm and execute the transaction. This step detaches the selected
        Sub-Accounts from Console. <br /> <br />⦿<strong>Completion</strong>:
        After execution, the Sub-Accounts are no longer accessible from the
        Console UI. The Console Safeguard with Policy is removed, operators are
        cleared, and replaced with the Main Console Safe owners, who become the
        sole owners of the Sub-Account Safe. They can now freely perform
        transactions on the Sub-Account Safe from&nbsp;
        <a
          className="text-blue-400"
          href="https://app.safe.global/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://app.safe.global/.
        </a>
      </p>
    ),
  },
  {
    title: "Important Considerations",
    subtitle: (
      <p>
        ⦿ The detached Sub-Accounts will no longer have Console Policies applied
        to them (this means any transaction can be executed by the Safe Owners!)
        <br /> <br />⦿ The detached Sub-Account will not be accessible on the
        Console UI anymore. <br /> <br />⦿ A detached Sub-Account cannot be
        re-attached to the Console as Sub-Accounts cannot be imported back.{" "}
        <br /> <br />⦿{" "}
        <strong>
          Proceed with caution. Ensure you have a complete understanding of the
          process and implications of detaching a Sub-Account.
        </strong>
      </p>
    ),
  },
  {
    title: "Final Notes",
    subtitle: (
      <p>
        This tool streamlines the creation of the required module transaction to
        remove the guard and policy from your Sub-Account Safes in one single
        batched transaction. It is designed to facilitate your management of
        Sub-Account Safes independently, consistent with the DeFi
        ecosystem&apos;s ethos of self-custody.
      </p>
    ),
  },
];
