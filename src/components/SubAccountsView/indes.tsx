type SubAccountsViewProps = {
  subaccounts: string[];
  selectedAccounts: string[];
  selectAccount: (account: string) => void;
};

export default function SubAccountsView({
  subaccounts,
  selectAccount,
  selectedAccounts,
}: SubAccountsViewProps) {
  return (
    <div className="h-40rem w-full bg-gray-300 p-4 flex flex-col gap-4 mt-6 rounded-md">
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
