import { type CSSProperties, useEffect, useRef, useState } from "react";
import { jetbrainsMono } from "@/app/fonts/fonts";

interface YearDropdownProps {
  years: number[];
  selectedYear: number;
  onSelect: (year: number) => void;
}

const dropdownContainerStyle: CSSProperties = {
  background: "rgba(0, 1, 18, 0.0)",
  border: "0px solid rgba(125, 133, 136, 0.3)",
  borderRadius: "0px",
  padding: "0px",
};

export function YearDropdown({
  years,
  selectedYear,
  onSelect,
}: YearDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = () => setIsOpen((prev) => !prev);
  const selectYear = (year: number) => {
    onSelect(year);
    setIsOpen(false);
  };

  return (
    <div style={dropdownContainerStyle}>
      <div ref={dropdownRef} style={{ position: "relative" }}>
        <div
          className={`font-lighter ${jetbrainsMono.className}`}
          onClick={toggle}
          style={{
            width: "100%",
            padding: "10px 12px",
            background: "rgba(0, 1, 18, 0.0)",
            border: "1px solid rgba(125, 133, 136, 0.4)",
            borderRadius: "0px",
            color: "white",
            fontSize: "15px",
            fontWeight: "lighter",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <span>{selectedYear}</span>
          <svg
            style={{
              width: "12px",
              height: "12px",
              transition: "transform 0.2s ease",
              flexShrink: 0,
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
            viewBox="0 0 17.3242 10.4004"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.48633 10.4004C8.73047 10.4004 8.97461 10.3027 9.14062 10.1172L16.6992 2.37305C16.8652 2.20703 16.9629 1.99219 16.9629 1.74805C16.9629 1.24023 16.582 0.849609 16.0742 0.849609C15.8301 0.849609 15.6055 0.947266 15.4395 1.10352L7.95898 8.75L9.00391 8.75L1.52344 1.10352C1.36719 0.947266 1.14258 0.849609 0.888672 0.849609C0.380859 0.849609 0 1.24023 0 1.74805C0 1.99219 0.0976562 2.20703 0.263672 2.38281L7.82227 10.1172C8.00781 10.3027 8.23242 10.4004 8.48633 10.4004Z"
              fill="white"
              fillOpacity="0.85"
            />
          </svg>
        </div>

        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "rgba(20, 20, 20, 0)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(125, 133, 136, 0.4)",
              color: "white",
              maxHeight: "400px",
              overflowY: "auto",
              zIndex: 10,
              marginTop: "4px",
            }}
          >
            {years.map((year) => (
              <div
                className={`font-lighter ${jetbrainsMono.className}`}
                key={year}
                onClick={() => selectYear(year)}
                style={{
                  padding: "10px 12px",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "lighter",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {year}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
