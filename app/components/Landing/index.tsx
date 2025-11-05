// type LandingProps = {}

import LayoutWrapper from "../ui/LayoutWrapper";
import Footer from "./Footer";
import MastheadSection from "./MastheadSection";
import SubaccountRecovery from "./SubaccountRecovery";
import WalletLoginView from "./WalletLoginView";

export default function Landing() {
  return (
    <LayoutWrapper>
      <MastheadSection />
      <SubaccountRecovery />
      <WalletLoginView />
      <Footer />
    </LayoutWrapper>
  );
}
