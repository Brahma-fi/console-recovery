import Image from "next/image";
import TitleText from "../ui/TitleText";
import SubtitleText from "../ui/SubtitleText";

export default function MastheadSection() {
  return (
    <div className="flex flex-col gap-[28px] pb-[22px]">
      <div className="w-full h-full">
        {/* Mobile Image */}
        <Image
          src="/images/Recovery.png"
          alt="Recovery"
          width={1920}
          height={1080}
          className="w-full h-full object-cover block md:hidden"
        />
        {/* Desktop Image */}
        <Image
          src="/images/MastheadDesktop.png"
          alt="Recovery"
          width={1920}
          height={1080}
          className="w-full h-full object-cover hidden md:block"
        />
      </div>
    </div>
  );
}
