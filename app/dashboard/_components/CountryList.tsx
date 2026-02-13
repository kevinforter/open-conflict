import { jetbrainsMono } from "@/app/fonts/fonts";
interface CountryListProps {
  countries?: { country: string; code: string; rank?: number }[];
  isLoading: boolean;
  selectedCountry: string | null;
  selectedYear: number;
  onSelectCountry: (code: string) => void;
  orientation?: "vertical" | "horizontal";
}

export function CountryList({
  countries,
  isLoading,
  selectedCountry,
  selectedYear,
  onSelectCountry,
  orientation = "vertical",
}: CountryListProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      style={{
        background: "rgba(0, 1, 18, 0.0)",
        border: "0px solid rgba(125, 133, 136, 0.3)",
        borderRadius: "0px",
        padding: "0px",
        flex: "1",
        overflow: "hidden",
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        alignItems: isHorizontal ? "center" : "stretch",
      }}
    >
      {!isHorizontal && (
        <h3
          className={`font-light ${jetbrainsMono.className}`}
          style={{
            margin: "0 0 12px 0",
            color: "#ff9a65",
            fontSize: "16px",
            fontWeight: "600",
            textTransform: "uppercase",
          }}
        >
          Countries [ {countries?.length || 0} ]
        </h3>
      )}
      <div
        className=""
        style={{
          flex: "1",
          overflowY: isHorizontal ? "hidden" : "auto",
          overflowX: isHorizontal ? "auto" : "hidden",
          paddingRight: isHorizontal ? "0" : "8px",
          display: isHorizontal ? "flex" : "block",
          alignItems: "center",
          whiteSpace: isHorizontal ? "nowrap" : "normal",
        }}
      >
        {isLoading ? (
          <p
            className={`font-light ${jetbrainsMono.className}`}
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "14px",
              margin: 0,
            }}
          >
            Loading countries...
          </p>
        ) : countries && countries.length > 0 ? (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: isHorizontal ? "flex" : "block",
              gap: isHorizontal ? "16px" : "0",
              flexShrink: 0, // Prevent UL from shrinking
            }}
          >
            {countries.map((item, index: number) => (
              <li
                className={`font-light ${jetbrainsMono.className}`}
                key={item.code}
                onClick={() => onSelectCountry(item.code)}
                style={{
                  color: selectedCountry === item.code ? "#ff9a65" : "white",
                  fontSize: selectedCountry === item.code ? "22px" : "18px",
                  fontWeight: "100",
                  padding: isHorizontal ? "4px 8px" : "8px 12px",
                  marginBottom: isHorizontal ? "0" : "4px",
                  background: "transparent",
                  borderRadius: "0px",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  borderLeft: !isHorizontal
                    ? selectedCountry === item.code
                      ? "3px solid #ff9a65"
                      : "3px solid transparent"
                    : "none",
                  borderBottom: isHorizontal
                    ? selectedCountry === item.code
                      ? "3px solid #ff9a65"
                      : "3px solid transparent"
                    : "none",
                  transform: "translateX(0)",
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0, // Prevent LI from shrinking
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "transparent";
                  if (!isHorizontal) {
                    e.currentTarget.style.transform = "translateX(8px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <span
                  style={{
                    flex: 1,
                    marginRight: isHorizontal ? "0" : "30px", // Force wrap earlier to avoid jump on selection
                    lineHeight: "1.2",
                  }}
                >
                  {item.country}
                  {item.rank && (
                    <sup
                      style={{
                        fontSize: "10px",
                        marginLeft: "4px",
                        color:
                          selectedCountry === item.code
                            ? "white"
                            : "rgba(255, 255, 255, 0.5)",
                        verticalAlign: "2px", // Aligns the rank number with the country name
                      }}
                    >
                      {item.rank}
                    </sup>
                  )}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p
            className={`font-light ${jetbrainsMono.className}`}
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "14px",
              margin: 0,
            }}
          >
            No countries found for {selectedYear}
          </p>
        )}
      </div>
    </div>
  );
}
