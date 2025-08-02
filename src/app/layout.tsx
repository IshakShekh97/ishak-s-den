import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import SmoothScrollProvider from "@/components/provider/SmoothScrollProvider";
import { SmoothCursor } from "@/components/animated/smooth-cursor";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
        className={`${poppins.className} antialiased dark:bg-black bg-amber-50 relative`}
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
