import * as d3 from "d3";

export type Datum = { x: Date; y: number };

type EmojiVsReaction = { date: string; emoji: number; reactions: number };

/**
 * Parse json data and sort it in ascending order
 *
 * @returns An object containing an array of emojis and an array of reactions
 */
export const parseJson = (json: EmojiVsReaction[]) => {
  const parsed = json.map((j) => ({ ...j, date: new Date(j.date) }));
  const sortedInAsc = parsed.sort((a, b) => {
    return a.date.valueOf() - b.date.valueOf();
  });
  const data: {
    emoji: Datum[];
    reactions: Datum[];
  } = {
    emoji: [],
    reactions: [],
  };

  sortedInAsc.forEach((entry) => {
    const date = new Date(entry.date);
    data.emoji.push({ x: date, y: entry.emoji });
    data.reactions.push({ x: date, y: entry.reactions });
  });

  return data;
};

export type Data = ReturnType<typeof parseJson>;

/**
 * Calculate suitable x & y scales based on the given data range and chart measurements
 *
 * @returns An object containing x & y scales which will be used in chart
 */
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
