import { AVAILABLE_CHAINS } from "@/pages";

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
    <div className="flex justify-between ">
      <div>
        <input
          type="text"
          className="text-[2rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-blue-500 block w-[60rem] p-2.5"
          placeholder="Write console address here"
          value={consoleAddress}
          onChange={(e) => setConsoleAddress(e.target.value)}
        />
      </div>
      <div>
        <select
          id="countries"
          className="text-[2rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-blue-500 block w-[15rem] p-2.5"
        >
          {Object.keys(AVAILABLE_CHAINS).map((chain) => (
            <option
              onClick={(e) => {
                setChain(chain);
                e.stopPropagation();
              }}
              key={chain}
              selected={selectedChain === chain}
            >
              {chain.toLocaleUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
