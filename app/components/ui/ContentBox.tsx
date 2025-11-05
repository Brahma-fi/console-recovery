import { ReactNode } from "react";

type ContentBoxProps = {
  id: string;
  children: ReactNode;
};

export default function ContentBox({ children, id }: ContentBoxProps) {
  return (
    <div id={id} className="w-full py-[64px] border-t border-[#FFFFFF29]">
      {children}
    </div>
  );
}
