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
    <p
      className={`text-[#CBCED1] text-base font-normal leading-6 ${className}`}
    >
      {children}
    </p>
  );
}
