"use client";
import ContentBox from "../ui/ContentBox";
import SubtitleText from "../ui/SubtitleText";
import TitleText from "../ui/TitleText";
import { usePrivy } from "@privy-io/react-auth";
import { UserProfile } from "../auth/user-profile";
import { AuthButtons } from "../auth/auth-buttons";
import { NAV_IDS } from "../navigation";

export default function WalletLoginView() {
  const { ready, authenticated } = usePrivy();

  return (
    <ContentBox id={NAV_IDS.MAIL_LOGIN}>
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[12px]">
          <TitleText iconUrl="/icons/WalletIcon.png">
            Convert Privy mail login to a wallet login
          </TitleText>
          <SubtitleText>
            If you created your Brahma Account using email via Privy, a wallet
            was automatically generated for you. Use this tool to export its
            private key, you’ll need it to access your account in the Safe UI.
          </SubtitleText>

          <SubtitleText>1. Connect with Google or email.</SubtitleText>
          <SubtitleText>2. Copy your private key.</SubtitleText>
          <SubtitleText>
            3. Import it into your favourite wallet (eg. Phantom, Rabby,
            Metamask, etc).
          </SubtitleText>
          <SubtitleText>
            4. Connect the imported wallet to Safe.global UI to login your
            Account as Safe.
          </SubtitleText>
        </div>

        {/* wallet Recovery button and view */}
        <div className="w-full flex justify-center pt-[12px]">
          {!ready ? (
            <LoadingSpinner />
          ) : authenticated ? (
            <UserProfile />
          ) : (
            <AuthButtons />
          )}
        </div>
      </div>
    </ContentBox>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary"></div>
    </div>
  );
}
