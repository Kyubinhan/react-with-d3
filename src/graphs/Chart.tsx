import React, { useEffect, useRef, useState, useContext } from "react";
import * as d3 from "d3";

import "./Chart.css";
import Axis from "./Axis";
import Area from "./Area";
import MouseLine from "./MouseLine";
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
  const [mousePos, setMousePos] = useState<[number, number] | null>(null);

  useEffect(() => {
    const svgElement = svgRef.current;

    if (svgElement) {
      const selection = d3.select(svgElement);
      selection.on("touchmove mousemove", (e) => {
        setMousePos(d3.pointer(e));
      });
    }

    return () => {
      d3.select(svgElement).on("touchmove mousemove", null);
    };
  }, []);

  return (
    // Make it responsive: https://medium.com/@louisemoxy/a-simple-way-to-make-d3-js-charts-svgs-responsive-7afb04bc2e4b
    <svg className="chart" ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
      <Axis scale={scales.y} orient="left" />
      <Axis scale={scales.x} orient="bottom" />
      <Area className="emoji" data={data.emoji} scales={scales} />
      <Area className="reactions" data={data.reactions} scales={scales} />
      <MouseLine mousePos={mousePos} />
    </svg>
  );
};

export default React.memo(Chart);
