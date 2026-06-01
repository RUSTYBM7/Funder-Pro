import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "FunderPro Integrations",
  description: "FunderPro Trading Platform Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}