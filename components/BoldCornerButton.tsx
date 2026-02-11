import React from "react";
import { n27 } from "@/app/fonts/fonts";

interface BoldCornerButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const BoldCornerButton: React.FC<BoldCornerButtonProps> = ({
  onClick,
  children,
  className = "",
}) => {
  return (
    <div className={`group relative inline-flex ${className}`}>
      {/* Bold Corners on Wrapper - Animate Position instead of Padding */}
      <span className="absolute -top-0.25 -left-0.25 w-1.5 h-1.5 border-t border-l border-white transition-all group-hover:top-0 group-hover:left-0" />
      <span className="absolute -top-0.25 -right-0.25 w-1.5 h-1.5 border-t border-r border-white transition-all group-hover:top-0 group-hover:right-0" />
      <span className="absolute -bottom-0.25 -left-0.25 w-1.5 h-1.5 border-b border-l border-white transition-all group-hover:bottom-0 group-hover:left-0" />
      <span className="absolute -bottom-0.25 -right-0.25 w-1.5 h-1.5 border-b border-r border-white transition-all group-hover:bottom-0 group-hover:right-0" />

      <button
        onClick={onClick}
        className={`relative px-4 py-2 border border-white/30 text-white text-sm ${n27.className} uppercase tracking-[0.15em] hover:bg-[rgba(255,154,101,0.1)] hover:border-[#ff9a65] hover:text-[#ff9a65] transition-colors cursor-pointer z-10`}
      >
        {children}
      </button>
    </div>
  );
};

export default BoldCornerButton;
