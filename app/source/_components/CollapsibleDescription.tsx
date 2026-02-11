"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CollapsibleDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4">
      <div
        className={`relative overflow-hidden transition-all duration-500 ease-in-out md:max-h-none ${
          isExpanded ? "max-h-[1000px]" : "max-h-[120px]"
        }`}
      >
        <div className={isExpanded ? "" : "mask-linear-fade"}>{children}</div>

        {/* Gradient overlay for smooth fade out when collapsed - Mobile only */}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-black to-transparent md:hidden" />
        )}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-xs font-[geistMono] uppercase tracking-widest text-[#ff9a65] hover:text-white transition-colors md:hidden"
      >
        {isExpanded ? (
          <>
            Read Less <ChevronUp className="w-3 h-3" />
          </>
        ) : (
          <>
            Read More <ChevronDown className="w-3 h-3" />
          </>
        )}
      </button>
    </div>
  );
}
