import Image from "next/image";
import TitleText from "../ui/TitleText";
import SubtitleText from "../ui/SubtitleText";
import Link from "next/link";
import { LINKS } from "@/app/config/constants";

export default function MastheadSection() {
  return (
    <div className="flex flex-col gap-[28px] pb-[64px]">
      <div className="w-full h-full">
        <Image
          src="/images/Recovery.png"
          alt="Recovery"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-[12px]">
        <TitleText>Brahma.fi recovery tools</TitleText>
        <SubtitleText>
          This page helps you keep access to your Sub-accounts and Automations,
          or convert your Google/email login into a wallet login after the
          Brahma UI shuts down.
        </SubtitleText>
        {/* <SubtitleText>
          <Link
            href={LINKS.TWITTER}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 text-gray-300"
          >
            Verify the page URL from official announcement.
          </Link>
        </SubtitleText> */}
      </div>
    </div>
  );
}
