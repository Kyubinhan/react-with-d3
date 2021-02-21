import React, { useRef, useContext } from "react";

import "./Chart.css";
import Axis from "./Axis";
import Area from "./Area";
import { ChartContext } from "./ChartContext";
import { Data, Scales } from "./utils";

interface Props {
  data: Data;
  scales: Scales;
}

const Chart = ({ data, scales }: Props) => {
  // ! mark to tell the TypeScript compiler that its return value won’t be null
  const { width, height } = useContext(ChartContext)!;

  const svgRef = useRef<SVGSVGElement>(null);

  return (
    // Make it responsive: https://medium.com/@louisemoxy/a-simple-way-to-make-d3-js-charts-svgs-responsive-7afb04bc2e4b
    <svg className="chart" ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
      <Axis scale={scales.y} orient="left" />
      <Axis scale={scales.x} orient="bottom" />
      <Area className="emoji" data={data.emoji} scales={scales} />
      <Area className="reactions" data={data.reactions} scales={scales} />
    </svg>
  );
};

export default React.memo(Chart);
