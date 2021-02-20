import React, { useContext } from "react";
import * as d3 from "d3";

import { ChartContext } from "./ChartContext";
import { Datum, Scales } from "./utils";

interface Props {
  className: string;
  data: Datum[];
  scales: Scales;
}

const Area = ({ className, data, scales }: Props) => {
  console.log("Area rendered");

  const { height, padding } = useContext(ChartContext)!;

  const area = d3
    .area<Datum>()
    .x((d) => scales.x(d.x))
    .y0(height - padding)
    .y1((d) => scales.y(d.y))
    .curve(d3.curveCardinal.tension(1));
  const d = area(data);

  if (!d) {
    return null;
  }

  return <path className={`area ${className}`} d={d} />;
};

export default React.memo(Area);
