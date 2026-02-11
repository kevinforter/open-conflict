import { Geist } from "next/font/google";
import localFont from "next/font/local";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = localFont({
  src: "./GeistMono-VariableFont_wght.ttf",
  variable: "--font-geist-mono",
  weight: "100 400 700 900",
});

export const jetbrainsMono = localFont({
  src: "./JetBrainsMono-Variable.ttf",
  variable: "--font-jetbrains-mono",
  weight: "100 900",
});

export const disketMono = localFont({
  src: "./Disket-Mono-Regular.ttf",
  variable: "--font-disket-mono",
  weight: "400",
});

export const majorMono = localFont({
  src: "./MajorMonoDisplay-Regular.ttf",
  variable: "--font-major-mono",
  weight: "100 400 700 900",
});

export const n27 = localFont({
  src: "./N27-Regular.otf",
  variable: "--font-n27",
  weight: "400",
});

export const rx100 = localFont({
  src: "./RX100-Regular.woff2",
  variable: "--font-rx100",
  weight: "100 400 700 900",
});
