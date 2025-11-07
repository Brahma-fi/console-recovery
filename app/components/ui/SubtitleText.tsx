import { ReactNode } from "react";

type SubtitleTextProps = {
  children: ReactNode;
  className?: string;
};

export default function SubtitleText({
  children,
  className = "",
}: SubtitleTextProps) {
  return (
    <p className={`text-[#ACB2BC] text-base leading-6 ${className}`}>
      {children}
    </p>
  );
}
