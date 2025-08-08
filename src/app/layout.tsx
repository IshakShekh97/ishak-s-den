import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ProviderWrapper from "@/components/provider/ProviderWrapper";
import { ScrollProgress } from "@/components/scroll-progress";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ishak's Den",
  description: "An awesome portfolio website of Ishak",
  icons: [
    {
      url: "/logo.svg",
      pathname: "/logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.className} antialiased dark:bg-black bg-amber-50 relative`}
      >
        <ScrollProgress className="h-[2px] !rounded-full" />
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
