import { ReactNode } from "react";

type ContentBoxProps = {
  id: string;
  children: ReactNode;
};

export default function ContentBox({ children, id }: ContentBoxProps) {
  return (
    <div id={id} className="w-full md:pt-[40px] md:pb-[40px]">
      {children}
    </div>
  );
}
