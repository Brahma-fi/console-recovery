import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PrivyClientProvider } from "@/app/lib/privy-provider";
import { APP_CONFIG } from "@/app/config/constants";
import { Navigation } from "@/app/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    images: [
      {
        url: "/images/OG.webp",
        width: 1200,
        height: 630,
        alt: "Brahma Account Recovery",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    images: ["/images/OG.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PrivyClientProvider>
          <Navigation />
          {children}
        </PrivyClientProvider>
      </body>
    </html>
  );
}
