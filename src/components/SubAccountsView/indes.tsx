type SubAccountsViewProps = {
  subaccounts: string[];
  selectedAccounts: string[];
  onDownloadClick: () => void;
  selectAccount: (account: string) => void;
};

export default function SubAccountsView({
  subaccounts,
  selectAccount,
  selectedAccounts,
  onDownloadClick,
}: SubAccountsViewProps) {
  const isDownloadButtonDisabled = selectedAccounts.length === 0;
  return (
    <div className="mt-6">
      <div className="h-40rem w-full bg-gray-300 p-4 flex flex-col gap-4 rounded-md overflow-auto max-h-[30rem]">
        {subaccounts.length === 0 ? (
          <p>No subaccounts</p>
        ) : (
          <>
            {subaccounts.map((subaccount) => (
              <SubaccountItem
                key={subaccount}
                address={subaccount}
                onSelect={() => selectAccount(subaccount)}
                isSelected={selectedAccounts.includes(subaccount)}
              />
            ))}
          </>
        )}
      </div>
      <div className="mt-4rem flex w-full justify-center">
        <button
          onClick={onDownloadClick}
          disabled={isDownloadButtonDisabled}
          type="button"
          className={`text-gray-100 bg-gray-800 border border-gray-300 focus:outline-none py-2.5 me-2 mb-2 mt-4 font-medium rounded-lg text-sm px-5  ${
            isDownloadButtonDisabled
              ? "cursor-not-allowed"
              : " hover:bg-gray-900 focus:ring-4 focus:ring-gray-200 "
          }`}
        >
          Download JSON
        </button>
      </div>
    </div>
  );
}

type SubaccountItemProps = {
  isSelected: boolean;
  address: string;
  onSelect: () => void;
};

const SubaccountItem = ({
  isSelected,
  address,
  onSelect,
}: SubaccountItemProps) => {
  return (
    <div className="flex items-center gap-4">
      <div
        className="border-2 h-[20px] w-[20px] flex justify-center items-center border-black rounded-sm cursor-pointer"
        onClick={onSelect}
      >
        {isSelected ? "✔️" : ""}
      </div>
      <p> {address} </p>
    </div>
  );
};
