import type { Metadata } from "next";
import { Parkinsans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const parkinsans = Parkinsans({
  weight: ["400", "300", "500", "600", "700", "800"],
  subsets: ["latin"],
})


export const metadata: Metadata = {
  title: "Ishak's Den",
  description: "An awesome portfolio website of Ishak",
  icons: [{
    url: '/logo.svg',
    pathname: '/logo.svg',
  }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${parkinsans.className} antialiased`}
      >
        <ThemeProvider
          attribute={'class'}
          defaultTheme={'dark'}
          enableSystem={true}
          disableTransitionOnChange
        >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
