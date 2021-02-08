import React from "react";
import * as d3 from "d3";

import { Datum } from "./Chart";

interface Props {
  className: string;
  data: Datum[];
  xScale: d3.ScaleTime<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  height: number;
  padding: number;
}

const Area = (props: Props) => {
  const { className, data, xScale, yScale, height, padding } = props;
  const area = d3
    .area<Datum>()
    .x((d) => xScale(d.x))
    .y0(height - padding)
    .y1((d) => yScale(d.y))
    .curve(d3.curveCardinal.tension(1));
  const d = area(data);

  if (!d) {
    return null;
  }

  return <path className={`area ${className}`} d={d} />;
};

export default React.memo(Area);
