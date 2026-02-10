import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Variable.ttf",
  variable: "--font-jetbrains-mono",
  weight: "100 900",
});

export const disketMono = localFont({
  src: "./fonts/Disket-Mono-Regular.ttf",
  variable: "--font-disket-mono",
  weight: "400",
});

export const n27 = localFont({
  src: "./fonts/N27-Regular.otf",
  variable: "--font-n27",
  weight: "400",
});
