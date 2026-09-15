// A 20×21 pixel-art backpack. Each character is one pixel; "p" pixels take the pocket accent.
const side = (inner: string) => `.o${inner}o.`;

const BAG = [
  "......oooooooo......",
  ".....o........o.....",
  ".....o........o.....",
  "..oooooooooooooooo..",
  side("hhhhhhhhhhhhhhha"),
  side("haaaaaaaaaaaaaas"),
  side("haaaaaaffaaaaaas"),
  side("saaaaaaffaaaaass"),
  ".oooooooooooooooooo.",
  side("hmaaaaaaaaaaaams"),
  side("hmaaaaaaaaaaaams"),
  side("amaooooooooooams"),
  side("amaoppppppppoams"),
  side("amaopppffpppoams"),
  side("amaoppppppppoams"),
  side("amaoppppppppoams"),
  side("amaooooooooooams"),
  side("smaaaaaaaaaaaams"),
  side("ssssssssssssssss"),
  "..oooooooooooooooo..",
  "...oo..........oo...",
];

const PALETTE: Record<string, string> = {
  o: "#1a120a",
  h: "#c08a52",
  a: "#9a6a3c",
  s: "#6b4426",
  m: "#4f7a5a",
  f: "#d9f99d",
};

// Merge horizontal runs of the same color into one rect to keep the DOM small.
const RUNS = BAG.flatMap((row, y) => {
  const runs: { x: number; y: number; width: number; key: string }[] = [];
  for (let x = 0; x < row.length; ) {
    const key = row[x];
    let width = 1;
    while (row[x + width] === key) width++;
    if (key !== ".") runs.push({ x, y, width, key });
    x += width;
  }
  return runs;
});

interface PixelBagProps {
  accent: string;
  className?: string;
}

export default function PixelBag({ accent, className }: PixelBagProps) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${BAG[0].length} ${BAG.length}`}
      shapeRendering="crispEdges"
      className={className}
    >
      {RUNS.map(({ x, y, width, key }) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={width}
          height={1}
          style={{ fill: key === "p" ? accent : PALETTE[key] }}
          className={key === "p" ? "transition-[fill] duration-300" : undefined}
        />
      ))}
    </svg>
  );
}
