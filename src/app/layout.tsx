import type { Metadata } from "next";
import { Parkinsans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import SmoothScrollProvider from "@/components/provider/SmoothScrollProvider";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

const parkinsans = Parkinsans({
  subsets: ["latin"],
  weight: ["400", "300", "500", "600", "700", "800"],
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
        className={`${parkinsans.className} antialiased dark:bg-black bg-amber-50`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="hidden md:block">
            <SmoothCursor />
          </div>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
