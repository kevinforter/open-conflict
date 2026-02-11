"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { createPortal } from "react-dom";

export default function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (pathname === "/dashboard") return null;

  return (
    <>
      {mounted &&
        createPortal(
          <div
            className={cn(
              "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 pointer-events-none",
              activeMenu ? "opacity-100" : "opacity-0",
            )}
          />,
          document.body,
        )}

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black flex flex-col pt-32 px-10 transition-all duration-500 ease-in-out md:hidden",
          mobileMenuOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible",
        )}
      >
        <div className="flex flex-col gap-8">
          {/* About Section */}
          <div className="border-b border-white/10 pb-8">
            <h3 className="text-xs font-[geistMono] uppercase text-white/40 tracking-widest mb-6">
              [About]
            </h3>
            <div className="flex flex-col gap-4">
              <Link
                href="/about"
                className="text-3xl font-[n27] text-white hover:text-[#ff9a65] transition-colors"
              >
                Overview
              </Link>
              <Link
                href="/methodology"
                className="text-3xl font-[n27] text-white hover:text-[#ff9a65] transition-colors"
              >
                Methodology
              </Link>
              <Link
                href="/team"
                className="text-3xl font-[n27] text-white hover:text-[#ff9a65] transition-colors"
              >
                Team
              </Link>
            </div>
          </div>

          {/* Index Section */}
          <div className="border-b border-white/10 pb-8">
            <h3 className="text-xs font-[geistMono] uppercase text-white/40 tracking-widest mb-6">
              [Index]
            </h3>
            <div className="flex flex-col gap-4">
              <Link
                href="/source"
                className="text-3xl font-[n27] text-white hover:text-[#ff9a65] transition-colors"
              >
                Sources
              </Link>
              <Link
                href="/impressum"
                className="text-3xl font-[n27] text-white hover:text-[#ff9a65] transition-colors"
              >
                Impressum
              </Link>
              <Link
                href="https://github.com/kevinforter/open-conflict"
                target="_blank"
                className="text-3xl font-[n27] text-white hover:text-[#ff9a65] transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>

          {/* Mobile Dashboard Button */}
          <div>
            <Link href="/dashboard" className="block w-full">
              <div className="group relative w-full h-14">
                <span className="absolute -top-0.25 -left-0.25 w-1.5 h-1.5 border-t border-l border-[#ff9a65]" />
                <span className="absolute -top-0.25 -right-0.25 w-1.5 h-1.5 border-t border-r border-[#ff9a65]" />
                <span className="absolute -bottom-0.25 -left-0.25 w-1.5 h-1.5 border-b border-l border-[#ff9a65]" />
                <span className="absolute -bottom-0.25 -right-0.25 w-1.5 h-1.5 border-b border-r border-[#ff9a65]" />

                <div className="relative flex items-center justify-center w-full h-full border bg-[#ff9a65]/10 border-[#ff9a65] text-white text-base font-[n27] uppercase tracking-[0.15em] hover:bg-[#ff9a65] transition-colors">
                  Open Dashboard
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center px-6 md:px-16 transition-all duration-300",
          scrolled || mobileMenuOpen
            ? "py-4 bg-black/50 backdrop-blur-md border-b border-white/5"
            : "py-6 bg-transparent",
        )}
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* Logo / Home Link */}
        <div className="flex justify-start">
          <Link href="/" className="group relative z-50">
            <Image
              src="/oc_logo.svg"
              alt="Open Conflict Logo"
              width={40}
              height={40}
              className="w-8 h-8 md:w-10 md:h-10 group-hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        {/* Navigation Links - Centered (Desktop) */}
        <div className="hidden md:flex justify-center items-center gap-12 relative">
          {/* About Mega Menu Trigger */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setActiveMenu("about")}
          >
            <span className="mr-2 text-white/50 text-sm font-[geistMono] uppercase tracking-widest transition-colors cursor-pointer py-4">
              [
            </span>
            <span
              className={cn(
                "text-sm font-[geistMono] uppercase tracking-widest transition-colors cursor-pointer py-4",
                activeMenu === "about" ||
                  pathname.includes("/about") ||
                  pathname.includes("/team") ||
                  pathname.includes("/methodology")
                  ? "text-white"
                  : "text-white/50 hover:text-white",
              )}
            >
              About
            </span>
          </div>

          {/* Sources Mega Menu Trigger */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setActiveMenu("sources")}
          >
            <span
              className={cn(
                "text-sm font-[geistMono] uppercase tracking-widest transition-colors cursor-pointer py-4",
                activeMenu === "sources" ||
                  pathname.includes("/source") ||
                  pathname.includes("/impressum")
                  ? "text-white"
                  : "text-white/50 hover:text-white",
              )}
            >
              Index
            </span>
            <span className="ml-2 text-white/50 text-sm font-[geistMono] uppercase tracking-widest transition-colors cursor-pointer py-4">
              ]
            </span>
          </div>
        </div>

        {/* Dashboard Button (Desktop) & Mobile Toggle */}
        <div className="flex justify-end col-start-3 md:col-auto z-50">
          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-[#ff9a65] transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Dashboard Button */}
          <Link href="/dashboard" className="hidden md:block">
            <div className="group relative inline-flex h-12">
              {/* Bold Corners on Wrapper */}
              <span className="absolute -top-0.25 -left-0.25 w-1.5 h-1.5 border-t border-l border-[#ff9a65] transition-all group-hover:top-0 group-hover:left-0 group-hover:border-[#ff9a65]/0" />
              <span className="absolute -top-0.25 -right-0.25 w-1.5 h-1.5 border-t border-r border-[#ff9a65] transition-all group-hover:top-0 group-hover:right-0 group-hover:border-[#ff9a65]/0" />
              <span className="absolute -bottom-0.25 -left-0.25 w-1.5 h-1.5 border-b border-l border-[#ff9a65] transition-all group-hover:bottom-0 group-hover:left-0 group-hover:border-[#ff9a65]/0" />
              <span className="absolute -bottom-0.25 -right-0.25 w-1.5 h-1.5 border-b border-r border-[#ff9a65] transition-all group-hover:bottom-0 group-hover:right-0 group-hover:border-[#ff9a65]/0" />

              <div className="relative flex items-center px-8 py-2 border bg-[#ff9a65]/10 border-[#ff9a65] text-white text-sm font-[n27] uppercase tracking-[0.15em] hover:bg-[#ff9a65] transition-colors cursor-pointer z-10">
                Open Dashboard
              </div>
            </div>
          </Link>
        </div>

        {/* Unified Dropdown Container (Desktop) */}
        <div
          className={cn(
            "hidden md:block absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 origin-top",
            activeMenu
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible",
          )}
          onMouseEnter={() => {}} // Keep menu open when hovering dropdown
        >
          <div className="w-[1000px] flex bg-white/5 shadow-2xl shadow-black/50">
            {/* About Menu Content */}
            {activeMenu === "about" && (
              <>
                <Link
                  href="/about"
                  onClick={() => setActiveMenu(null)}
                  className="flex-1 group/item p-6 hover:bg-white transition-colors relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <span className="block text-white font-[geistMono] text-md uppercase tracking-widest mb-2 group-hover/item:text-black transition-colors">
                      [The Project]
                    </span>
                    <h3 className="font-[n27] text-5xl text-white mb-1 group-hover/item:text-[#ff9a65] transition-colors pt-20">
                      Overview
                    </h3>
                    <p className="text-white/40 text-xs font-[geistMono] leading-relaxed group-hover/item:text-black transition-colors">
                      Mission, vision, and the challenge of visualizing
                      invisible data.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/methodology"
                  onClick={() => setActiveMenu(null)}
                  className="flex-1 group/item p-6 hover:bg-white transition-colors relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <span className="block text-white font-[geistMono] text-md uppercase tracking-widest mb-2 group-hover/item:text-black transition-colors">
                      [The Tech]
                    </span>
                    <h3 className="font-[n27] text-5xl text-white mb-1 group-hover/item:text-[#ff9a65] transition-colors pt-20">
                      Methodology
                    </h3>
                    <p className="text-white/40 text-xs font-[geistMono] leading-relaxed group-hover/item:text-black transition-colors">
                      Deep dive into data collection, normalization, and our
                      stack.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/team"
                  onClick={() => setActiveMenu(null)}
                  className="flex-1 group/item p-6 hover:bg-white transition-colors relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <span className="block text-white font-[geistMono] text-md uppercase tracking-widest mb-2 group-hover/item:text-black transition-colors">
                      [The People]
                    </span>
                    <h3 className="font-[n27] text-5xl text-white mb-1 group-hover/item:text-[#ff9a65] transition-colors pt-20">
                      Team
                    </h3>
                    <p className="text-white/40 text-xs font-[geistMono] leading-relaxed group-hover/item:text-black transition-colors">
                      Meet the students behind the Open Data Analysis
                      initiative.
                    </p>
                  </div>
                </Link>
              </>
            )}

            {/* Sources Menu Content */}
            {activeMenu === "sources" && (
              <>
                <Link
                  href="/source"
                  onClick={() => setActiveMenu(null)}
                  className="flex-1 group/item p-6 hover:bg-white transition-colors relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <span className="block text-white font-[geistMono] text-md uppercase tracking-widest mb-2 group-hover/item:text-black transition-colors">
                      [Data Origin]
                    </span>
                    <h3 className="font-[n27] text-5xl text-white mb-1 group-hover/item:text-[#ff9a65] transition-colors pt-20">
                      Sources
                    </h3>
                    <p className="text-white/40 text-xs font-[geistMono] leading-relaxed group-hover/item:text-black transition-colors">
                      Detailed documentation of UCDP, ACLED, and NGO incident
                      data.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/impressum"
                  onClick={() => setActiveMenu(null)}
                  className="flex-1 group/item p-6 hover:bg-white transition-colors relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <span className="block text-white font-[geistMono] text-md uppercase tracking-widest mb-2 group-hover/item:text-black transition-colors">
                      [Legal]
                    </span>
                    <h3 className="font-[n27] text-5xl text-white mb-1 group-hover/item:text-[#ff9a65] transition-colors pt-20">
                      Impressum
                    </h3>
                    <p className="text-white/40 text-xs font-[geistMono] leading-relaxed group-hover/item:text-black transition-colors">
                      Legal information, contact details, and project credits.
                    </p>
                  </div>
                </Link>

                <Link
                  href="https://github.com/kevinforter/open-conflict"
                  target="_blank"
                  onClick={() => setActiveMenu(null)}
                  className="flex-1 group/item p-6 hover:bg-white transition-colors relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <span className="block text-white font-[geistMono] text-md uppercase tracking-widest mb-2 group-hover/item:text-black transition-colors">
                      [Codebase]
                    </span>
                    <h3 className="font-[n27] text-5xl text-white mb-1 group-hover/item:text-[#ff9a65] transition-colors pt-20">
                      GitHub
                    </h3>
                    <p className="text-white/40 text-xs font-[geistMono] leading-relaxed group-hover/item:text-black transition-colors">
                      Explore the source code and contribute to the project.
                    </p>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
