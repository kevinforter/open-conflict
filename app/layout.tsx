import type { Metadata, Viewport } from "next";
import "./globals.css";
import { geistSans, geistMono } from "./fonts/fonts";
import { CustomCursor } from "@/components/CustomCursor";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Open Conflict",
  description: "Open Data Project by Team Kappa (Ming, Luca and Kevin)",
};

export const viewport: Viewport = {
  themeColor: "#101010",
  width: "device-width",
  initialScale: 1,
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
        <NavBar />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
