import { ReactNode } from "react";

type LayoutWrapperProps = {
  children: ReactNode;
};

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="w-full flex justify-center px-[16px] pt-[16px]">
      <div className="w-full md:w-[1000px]">{children}</div>
    </div>
  );
}
