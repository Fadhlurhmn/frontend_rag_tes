import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HR Assistant — PT. XYZ",
  description:
    "Tanyakan kebijakan cuti, reimbursement, dan WFH perusahaan secara langsung.",
  openGraph: {
    title: "HR Assistant — PT. XYZ",
    description: "Asisten HR internal PT. XYZ berbasis AI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
