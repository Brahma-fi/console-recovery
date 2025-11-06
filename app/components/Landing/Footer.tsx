// type FooterProps = {}

import Link from "next/link";
import TitleText from "../ui/TitleText";
import SubtitleText from "../ui/SubtitleText";
import { LINKS } from "@/app/config/constants";

export default function Footer() {
  function getCurrentYear() {
    return new Date().getFullYear().toString();
  }
  return (
    <div className="flex flex-col pt-[64px] md:pt-0 gap-[102px]">
      {/* <div className="flex flex-col gap-[16px]">
        <TitleText>Links</TitleText>
        <div className="flex flex-col">
          <LinkItem href={LINKS.TWITTER} label="Brahma joins Polymarket" />
          <LinkItem href={LINKS.SAFE_GLOBAL_UI} label="Safe Global UI" />
          <LinkItem href={LINKS.TWITTER} label="Brahma on X" />
        </div>
      </div> */}

      <div className="flex justify-between w-full py-[24px] border-t border-[#FFFFFF29]">
        <div className="w-full flex justify-center">
          <BottonText text={getCurrentYear()} />
        </div>
        <div className="w-full flex justify-center">
          <BottonText text="Brahma Team" />
        </div>
      </div>
    </div>
  );
}

const LinkItem = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-solid decoration-[auto] underline-offset-auto [text-underline-position:from-font] [text-decoration-skip-ink:none] font-normal not-italic text-[16px] leading-6 text-[#CBCED1]"
    >
      <SubtitleText>{label}</SubtitleText>
    </Link>
  );
};

const BottonText = ({ text }: { text: string }) => {
  return (
    <p className="text-white font-semibold text-[14px] leading-[24px] not-italic">
      {text}
    </p>
  );
};
