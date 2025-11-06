import { ReactNode } from "react";
import Image from "next/image";

type TitleTextProps = {
  children: ReactNode;
  iconUrl?: string;
};

export default function TitleText({ children, iconUrl }: TitleTextProps) {
  return (
    <div className="flex items-center gap-3">
      {iconUrl && (
        <div className="min-w-[48px] w-[48px] h-[48px] relative">
          <Image
            src={iconUrl}
            alt="Icon"
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <h2 className="text-[#E6E8ED] text-2xl font-semibold leading-[28px]">
        {children}
      </h2>
    </div>
  );
}
