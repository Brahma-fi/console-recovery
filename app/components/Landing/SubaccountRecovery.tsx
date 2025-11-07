// type SubaccountRecoveryProps = {}

import Link from "next/link";
import Image from "next/image";
import LinkArrowIcon from "../icons/LinkArrowIcon";
import ContentBox from "../ui/ContentBox";
import SubtitleText from "../ui/SubtitleText";
import TitleText from "../ui/TitleText";
import SafeRecoveryForm from "./SafeRecoveryForm";
import { LINKS, NAV_IDS } from "@/app/config/constants";

export default function SubaccountRecovery() {
  return (
    <ContentBox id={NAV_IDS.SUBACCOUNT_RECOVER}>
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[28px]">
          <div className="flex flex-col gap-[12px]">
            <TitleText iconUrl="/icons/SafeIcon.png">
              Sub-Account recovery tool
            </TitleText>
            <SubtitleText>
              Convert your Sub-Account or Automation into a Safe fully
              controlled by your own EOA wallet.
            </SubtitleText>{" "}
            <SubtitleText>
              It generates a JSON transaction file that removes guards and
              policies from your Sub-Account(s), fully compatible with the
              official Safe Transaction Builder at app.safe.global.
            </SubtitleText>
          </div>
          <div className="flex flex-col gap-[12px]">
            <SubtitleText className="text-[#E6E8ED] text-[16px]">
              1. Enter your Brahma Account address, associated Sub-Accounts will
              be automatically mapped below.
            </SubtitleText>
            <SubtitleText className="text-[#E6E8ED] text-[16px] ">
              2. Generate and download JSON file.
            </SubtitleText>
            <SubtitleText className="text-[#E6E8ED] text-[16px] ">
              3. Connect your owning EOA to the Safe UI and execute the file
              through Safe&apos;s Transaction Builder.
            </SubtitleText>
            <SubtitleText className="text-[#E6E8ED] text-[16px] ">
              4. Access your Sub-Accounts as individual Safes.
            </SubtitleText>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-[8px] md:gap-[24px]">
          {/* <LinkItem
            href={LINKS.YOUTUBE}
            iconUrl="/icons/YoutubeIcon.png"
            label="Video guide"
          /> */}
          <LinkItem
            href="https://help.safe.global/en/articles/234052-transaction-builder"
            iconUrl="/icons/SafeLogoIcon.png"
            label="Transaction Builder in Safe App"
          />
        </div>

        {/* Safe Recovery Form UI */}
        <SafeRecoveryForm />
      </div>
    </ContentBox>
  );
}

type LinkItemProps = {
  href: string;
  iconUrl: string;
  label: string;
};

const LinkItem = ({ href, iconUrl, label }: LinkItemProps) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 group transition-colors duration-150"
    >
      {/* Icon on left */}
      <div className="w-6 h-6 shrink-0">
        <Image
          src={iconUrl}
          alt=""
          width={24}
          height={24}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Link text in center */}
      <span
        className="text-[#E6E8ED] text-sm font-medium leading-5 underline decoration-2 underline-offset-4 transition-colors duration-150 group-hover:text-white group-hover:decoration-[white]"
        style={{ textDecorationStyle: "dotted" }}
      >
        {label}
      </span>

      {/* Arrow icon on right */}
      <span className="">
        <LinkArrowIcon />
      </span>
    </Link>
  );
};
