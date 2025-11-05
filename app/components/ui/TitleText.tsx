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
        <div className="w-10 h-10 relative">
          <Image
            src={iconUrl}
            alt="Icon"
            width={40}
            height={40}
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <h2 className="text-[#E6E8ED] text-2xl font-semibold leading-5">
        {children}
      </h2>
    </div>
  );
}
