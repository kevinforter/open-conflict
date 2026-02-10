interface CountryListProps {
  countries?: { country: string; code: string; rank?: number }[];
  isLoading: boolean;
  selectedCountry: string | null;
  selectedYear: number;
  onSelectCountry: (code: string) => void;
}

export function CountryList({
  countries,
  isLoading,
  selectedCountry,
  selectedYear,
  onSelectCountry,
}: CountryListProps) {
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
        flexDirection: "column",
      }}
    >
      <h3
        className="font-[jetbrainsMono] font-light"
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
      <div
        style={{
          flex: "1",
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: "8px",
        }}
      >
        {isLoading ? (
          <p
            className="font-[jetbrainsMono] font-light"
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
            }}
          >
            {countries.map((item, index: number) => (
              <li
                className="font-[jetbrainsMono] font-light"
                key={item.code}
                onClick={() => onSelectCountry(item.code)}
                style={{
                  color: selectedCountry === item.code ? "#ff9a65" : "white",
                  fontSize: selectedCountry === item.code ? "22px" : "18px",
                  fontWeight: "100",
                  padding: "8px 12px",
                  marginBottom: "4px",
                  background: "transparent",
                  borderRadius: "0px",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  borderLeft:
                    selectedCountry === item.code
                      ? "3px solid #ff9a65"
                      : "3px solid transparent",
                  transform: "translateX(0)",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "translateX(8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <span
                  style={{
                    flex: 1,
                    marginRight: "30px", // Force wrap earlier to avoid jump on selection
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
            className="font-[jetbrainsMono] font-light"
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
