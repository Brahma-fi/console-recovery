import { AVAILABLE_CHAINS } from "@/pages";
import { BrahmaLogoIcon } from "../icons";

type HeaderProps = {
  consoleAddress: string;
  selectedChain: string;
  setConsoleAddress: (consoleAddress: string) => void;
  setChain: (chain: string) => void;
};

export default function Header({
  consoleAddress,
  selectedChain,
  setConsoleAddress,
  setChain,
}: HeaderProps) {
  return (
    <div>
      <div className="pb-6 flex flex-col gap-3">
        <div className="w-2rem">
          <BrahmaLogoIcon />
        </div>
        <h3 className="text-xl font-bold">
          Brahma Console Sub-Account Safe Detachment Tool
        </h3>
        <p>
          Welcome to the Brahma Console Sub-Account Safe Recovery Page. This
          tool offers a simplified and efficient way to generate the necessary
          transaction file in json format for removing guards and policies from
          your Sub-Account Safes in a single batched transaction, fully
          compatible with the official Safe Transaction Builder at
          https://app.safe.global/. This tool is hosted on IPFS and fully
          decentralised.
        </p>
      </div>
      <div className="flex justify-between gap-5">
        <div>
          <input
            type="text"
            className="text-[20px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-blue-500 block w-full md:w-[30rem] p-2.5"
            placeholder="Write console address here"
            value={consoleAddress}
            onChange={(e) => setConsoleAddress(e.target.value)}
          />
        </div>
        <div>
          <select
            id="countries"
            className="text-[20px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-blue-500 block w-full lg:w-[15rem] p-2.5"
            defaultValue={AVAILABLE_CHAINS.mainnet}
            onChange={(e) => setChain(e.target.value)}
          >
            {Object.keys(AVAILABLE_CHAINS).map((chain) => (
              <option key={chain}>{chain}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
