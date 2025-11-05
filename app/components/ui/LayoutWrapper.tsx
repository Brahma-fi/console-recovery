import { ReactNode } from "react";

type LayoutWrapperProps = {
  children: ReactNode;
};

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="w-full flex justify-center p-[16px]">
      <div className="w-full lg:w-[600px]">{children}</div>
    </div>
  );
}
