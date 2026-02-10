"use client";

import { useEffect, useState, useRef } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "framer-motion";

interface CommandMenuProps {
  countries: { code: string; country: string }[];
  onSelectCountry: (code: string) => void;
}

export function CommandMenu({ countries, onSelectCountry }: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const commandRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle open on specific key combo (e.g. Cmd+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (open) {
            setOpen(false);
            const input = commandRef.current?.querySelector('input');
            input?.blur();
        } else {
            setOpen(true);
            const input = commandRef.current?.querySelector('input');
            input?.focus();
        }
      }
      if (e.key === "Escape") {
         setOpen(false);
         const input = commandRef.current?.querySelector('input');
         input?.blur();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  // Filter logic
  const filteredCountries = countries.filter((c) =>
    c.country.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="relative z-[50]" ref={commandRef}>
      <CommandPrimitive 
        label="Global Command Menu" 
        shouldFilter={false} // We filter manually to be safe or let cmdk do it? 
        // cmdk handles filtering if we don't pass shouldFilter=false. 
        // But we are mapping filteredCountries. So we should probably disable cmdk filter or pass all.
        // Let's pass all and let cmdk filter? 
        // But `countries` is prop. Let's use internal filtering logic to control rendering so we don't render 200 items invisible.
        className="relative w-[400px] flex flex-col"
      >
        {/* Input Bar */}
        <div 
            className={`
                flex items-center justify-between gap-2 px-3 py-[10px] 
                bg-transparent backdrop-blur-sm border border-[rgba(125,133,136,0.4)]
                text-white text-[15px] font-[jetbrainsMono] font-light 
                hover:bg-white/5 transition-all
                w-full
            `}
            // Click to ensure focus
            onClick={() => {
                setOpen(true);
                commandRef.current?.querySelector('input')?.focus();
            }}
        >
            <div className="flex items-center gap-2 flex-1">
                <MagnifyingGlassIcon className="w-4 h-4 text-white shrink-0" />
                <CommandPrimitive.Input
                    placeholder="Search Country..."
                    value={inputValue}
                    onValueChange={(val) => {
                        setInputValue(val);
                        setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    className="flex-1 bg-transparent outline-none placeholder:text-white/50 text-white font-[jetbrainsMono] font-light uppercase min-w-0"
                />
            </div>
            <span className="text-[10px] opacity-50 border border-white/20 px-1 font-[jetbrainsMono] font-light shrink-0">⌘ K</span>
        </div>

        {/* Dropdown Results */}
        {/* Dropdown Results */}
        {open && (
            <div className="absolute top-full left-0 w-full mt-2">
                <div className="bg-[rgba(5,20,50,0.2)] backdrop-blur-md border border-[rgba(125,133,136,0.4)] shadow-2xl max-h-[300px] overflow-hidden flex flex-col">
                    <CommandPrimitive.List className="overflow-y-auto overflow-x-hidden p-0 custom-scrollbar flex-1">
                             <CommandPrimitive.Empty className="py-6 text-center text-sm text-white/50 font-[jetbrainsMono] font-light">
                                No results found.
                            </CommandPrimitive.Empty>

                            {filteredCountries.map((country) => (
                                <CommandPrimitive.Item
                                key={country.code}
                                value={country.country}
                                onSelect={() => {
                                    onSelectCountry(country.code);
                                    setOpen(false);
                                    setInputValue("");
                                    // Blur input
                                    commandRef.current?.querySelector('input')?.blur();
                                }}
                                className="relative flex cursor-pointer select-none items-center px-4 py-3 text-[15px] outline-none aria-selected:bg-[rgba(255,255,255,0.1)] text-white font-[jetbrainsMono] font-light data-[disabled]:opacity-50 transition-colors uppercase"
                                >
                                <span className="flex-1 tracking-wide">{country.country}</span>
                                <span className="text-[10px] text-white/50 font-[jetbrainsMono] font-light">{country.code}</span>
                                </CommandPrimitive.Item>
                            ))}
                    </CommandPrimitive.List>
                </div>
            </div>
        )}
      </CommandPrimitive>
    </div>
  );
}
