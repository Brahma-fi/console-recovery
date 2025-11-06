// type LandingProps = {}

import LayoutWrapper from "../ui/LayoutWrapper";
import Footer from "./Footer";
import MastheadSection from "./MastheadSection";
import SubaccountRecovery from "./SubaccountRecovery";
import WalletLoginView from "./WalletLoginView";

export default function Landing() {
  return (
    <div className="flex flex-col">
      <LayoutWrapper>
        <MastheadSection />
        <div className="flex flex-col md:flex-row pt-[44px] md:pt-[21px] gap-[44px] md:gap-[80px]">
          <SubaccountRecovery />
          <div
            className="hidden md:block w-px self-stretch"
            style={{ background: "rgba(255, 255, 255, 0.16)" }}
          />
          <div
            className="block md:hidden h-px w-full self-stretch"
            style={{ background: "rgba(255, 255, 255, 0.16)" }}
          />
          <WalletLoginView />
        </div>
      </LayoutWrapper>
      <Footer />
    </div>
  );
}
