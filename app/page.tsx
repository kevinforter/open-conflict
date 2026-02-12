import Link from "next/link";
import packageJson from "../package.json";
import FuzzyText from "@/components/FuzzyText";
import ScrambledText from "@/components/ScrambledText";
import TextType from "@/components/TextType";
import BoldCornerButton from "@/components/BoldCornerButton";
import Noise from "@/components/Noise";
import { n27, majorMono, geistMono, jetbrainsMono, rx100 } from "./fonts/fonts";

export default function Home() {
  return (
    <div className="flex h-screen flex-col overflow-hidden relative">
      <Noise />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
      >
        <source src="/background/background.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-[-1]" />

      <main className="flex-1 overflow-y-auto flex flex-col items-center justify-center">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-20">
          <div className="container flex max-w-5xl flex-col items-center gap-4 text-center mx-auto px-4">
            <h1 className="flex flex-wrap items-center justify-center font-sans text-3xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              <span className={`${majorMono.className} antialiased text-white`}>
                open
              </span>
              <FuzzyText
                className={`${rx100.className} antialiased`}
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover
                fontSize={64}
                color="#ff9a65"
              >
                [ ]
              </FuzzyText>
              <TextType
                text={["data", "conflict"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                loop={false}
                className={`${majorMono.className} antialiased text-white`}
              />
            </h1>
            <p
              className={`${geistMono.className} antialiased max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8 text-white/60`}
            >
              The project develops a data-driven platform to visualize and
              analyze global conflicts and humanitarian incidents.
            </p>
            <div className="space-x-4">
              <Link href="/dashboard">
                <BoldCornerButton className="h-11">
                  View Conflicts
                </BoldCornerButton>
              </Link>
              <Link
                href="https://github.com/kevinforter/open-conflict"
                target="_blank"
                rel="noreferrer"
              >
                <BoldCornerButton className="h-11">GitHub</BoldCornerButton>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 md:py-0 flex-none bg-transparent w-full">
        <div className="flex flex-col items-center justify-between gap-4 md:h-12 md:flex-row w-full px-4 md:px-16">
          <p
            className={`${n27.className} antialiased text-center text-sm leading-loose text-muted-foreground md:text-left`}
          >
            <span className="mx-2">|</span>
            <Link
              href="/impressum"
              className="underline underline-offset-4 hover:text-white transition-colors"
            >
              Impressum
            </Link>
            <span className="mx-2 text-white/20">|</span>
            Source code on{" "}
            <a
              href="https://github.com/kevinforter/open-conflict"
              className="font-medium underline underline-offset-4 hover:text-white transition-colors"
            >
              GitHub
            </a>
            .
          </p>
          <ScrambledText
            radius={80}
            duration={0.9}
            speed={0.6}
            scrambleChars=".:-"
            className={`${jetbrainsMono.className} antialiased`}
            style={{
              color: "white",
              fontSize: "12px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              pointerEvents: "auto",
              opacity: 0.7,
            }}
          >
            VERSION {packageJson.version}
          </ScrambledText>
        </div>
      </footer>
    </div>
  );
}
