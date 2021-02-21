import * as d3 from "d3";

export type Datum = { x: Date; y: number };

type EmojiVsReaction = { date: string; emoji: number; reactions: number };

export const parseJson = (json: EmojiVsReaction[]) => {
  const parsed = json.map((j) => ({ ...j, date: new Date(j.date) }));
  const sorted = parsed.sort((a, b) => {
    return b.date.valueOf() - a.date.valueOf();
  });
  const data: {
    emoji: Datum[];
    reactions: Datum[];
  } = {
    emoji: [],
    reactions: [],
  };

  sorted.forEach((entry) => {
    const date = new Date(entry.date);
    data.emoji.push({ x: date, y: entry.emoji });
    data.reactions.push({ x: date, y: entry.reactions });
  });

  return data;
};

export type Data = ReturnType<typeof parseJson>;

export const calculateScales = (
  data: Data,
  measurements: { width: number; height: number; padding: number }
) => {
  const flattenData = Object.values(data).flat();
  const { width, height, padding } = measurements;
  const x = d3
    .scaleTime()
    .domain([
      d3.min(flattenData, (d) => d.x) as Date,
      d3.max(flattenData, (d) => d.x) as Date,
    ])
    .range([padding, width - padding]);
  const y = d3
    .scaleLinear()
    .domain([
      d3.min(flattenData, (d) => d.y) as number,
      d3.max(flattenData, (d) => d.y) as number,
    ])
    .range([height - padding, padding]);

  return { x, y };
};

export type Scales = ReturnType<typeof calculateScales>;
