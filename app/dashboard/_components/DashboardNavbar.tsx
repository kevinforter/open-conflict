import Link from "next/link";
import Image from "next/image";
import { BoldCornerButton } from "@/components/BoldCornerButton";
import { CommandMenu } from "./CommandMenu";
import { BarChartIcon } from "@radix-ui/react-icons";

interface DashboardNavbarProps {
  countries: any[];
  onSelectCountry: (code: string | null) => void;
  onGlobalStatsClick: () => void;
}

export function DashboardNavbar({
  countries,
  onSelectCountry,
  onGlobalStatsClick,
}: DashboardNavbarProps) {
  return (
    <nav className="absolute top-0 left-0 z-20 w-full px-4 py-3 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent pointer-events-auto lg:hidden">
      <div className="flex items-center gap-4 flex-1">
        <Link href="/" className="group shrink-0">
          <Image
            src="/oc_logo.svg"
            alt="Open Conflict Logo"
            width={32}
            height={32}
            className="w-8 h-8 group-hover:opacity-80 transition-opacity"
          />
        </Link>
        <div className="w-full max-w-[200px] md:max-w-[300px]">
          <CommandMenu
            countries={countries}
            onSelectCountry={onSelectCountry}
          />
        </div>
      </div>
      <BoldCornerButton
        onClick={onGlobalStatsClick}
        className="shrink-0 text-[10px] ml-2 flex items-center justify-center"
      >
        <span className="hidden min-[500px]:inline">Global Stats</span>
        <BarChartIcon className="inline min-[500px]:hidden w-4 h-4 text-white" />
      </BoldCornerButton>
    </nav>
  );
}
