import React from "react";
const ELLIPSIS = "\u2026"; // Please use this in your solution and NOT '...' (three dots)

interface ChipListProps {
  chips?: { label: string }[];
  maxChips?: number;
  maxTextLength?: number;
}

interface ChipProps {
  label: string;
}

export const ChipList = ({ chips, maxChips, maxTextLength }: ChipListProps) => {
  if (!chips || chips.length === 0) return <></>;

  if (maxChips != null && maxChips < 1) {
    return (
      <section style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <aside data-testid="exceeding-text">{chips.length} more items</aside>
      </section>
    );
  }

  const maxDisplay = maxChips ?? chips.length;
  const displayedChips = chips.slice(0, maxDisplay);
  const remainingCount = chips.length - displayedChips.length;

  const formatChipLabel = (label: string) => {
    if (maxTextLength == null) return label;
    if (maxTextLength <= 0) return ELLIPSIS;
    if (label.length <= maxTextLength) return label;
    return label.slice(0, maxTextLength) + ELLIPSIS;
  };

  return (
    <section style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      {displayedChips.map((chip, index) => {
        return (
          <div
            style={{
              border: "1px solid #bbbbbb",
              padding: "4px",
              borderRadius: "8px",
            }}
            data-testid={`chip-${index}`} // use index of each item here
            key={index}
          >
            {formatChipLabel(chip.label)}
          </div>
        );
      })}

      {remainingCount > 0 && (
        <aside data-testid="exceeding-text">{remainingCount} more items</aside>
      )}
    </section>
  );
};

const sampleChips: ChipProps[] = [
  { label: "123456" },
  { label: "1234567" },
  { label: "12345678" },
  { label: "12345" },
  { label: "123456789" },
];

// used in the preview tab, don't remove this
//(you can add and change the parameters to test different cases)

export default function App() {
  // return <ChipList maxChips={3} maxTextLength={6} chips={sampleChips} />;
  // return <ChipList maxChips={3} chips={sampleChips} />;
  return <ChipList />;
  // return <ChipList maxTextLength={6} chips={sampleChips} />;
}
