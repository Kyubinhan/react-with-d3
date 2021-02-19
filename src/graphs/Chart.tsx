import React from "react";
import * as d3 from "d3";

import "./Chart.css";
import EmojiVsReactions from "../emoji-vs-reactions.json";
import Axis from "./Axis";
import Area from "./Area";

export type Datum = { x: Date; y: number };

type EmojiVsReaction = { date: string; emoji: number; reactions: number };

const parseJson = (json: EmojiVsReaction[]) => {
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

interface Props {
  width: number;
  height: number;
  padding: number;
}

const calculateScales = (
  data: Datum[],
  width: number,
  height: number,
  padding: number
) => {
  const xScale = d3
    .scaleTime()
    .domain([
      d3.min(data, (d) => d.x) as Date,
      d3.max(data, (d) => d.x) as Date,
    ])
    .range([padding, width - padding]);
  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (d) => d.y) as number,
      d3.max(data, (d) => d.y) as number,
    ])
    .range([height - padding, padding]);

  return { xScale, yScale };
};

const Chart = (props: Props) => {
  const { width, height, padding } = props;
  const data = parseJson(EmojiVsReactions);
  const flattenData = Object.values(data).flat();
  const { xScale, yScale } = calculateScales(
    flattenData,
    width,
    height,
    padding
  );

  return (
    // Make it responsive: https://medium.com/@louisemoxy/a-simple-way-to-make-d3-js-charts-svgs-responsive-7afb04bc2e4b
    <svg viewBox={`0 0 ${width} ${height}`}>
      <Axis
        width={width}
        height={height}
        padding={padding}
        scale={yScale}
        orient="left"
      />
      <Axis
        width={width}
        height={height}
        padding={padding}
        scale={xScale}
        orient="bottom"
      />
      <Area
        className="emoji"
        data={data.emoji}
        xScale={xScale}
        yScale={yScale}
        height={height}
        padding={padding}
      />
      <Area
        className="reactions"
        data={data.reactions}
        xScale={xScale}
        yScale={yScale}
        height={height}
        padding={padding}
      />
    </svg>
  );
};

export default React.memo(Chart);
