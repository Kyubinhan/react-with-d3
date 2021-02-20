import React, { useContext, useEffect, useRef } from "react";
import * as d3 from "d3";

import { ChartContext } from "./ChartContext";

const getOrientedAxis = (
  width: number,
  padding: number,
  orient: Props["orient"],
  scale: Props["scale"]
) => {
  const gridWidth = width - padding * 2;
  if (orient === "left") {
    return d3.axisLeft(scale).tickSizeInner(-gridWidth).tickSizeOuter(0);
  } else if (orient === "bottom") {
    return d3.axisBottom(scale).tickSizeOuter(0);
  } else {
    return d3
      .axisRight(scale)
      .tickSizeInner(-gridWidth)
      .tickSizeOuter(0)
      .tickPadding(5);
  }
};

const getTransformValue = (
  width: number,
  height: number,
  padding: number,
  orient: Props["orient"]
): string => {
  if (orient === "left") {
    return `translate(${padding}, 0)`;
  } else if (orient === "bottom") {
    return `translate(0, ${height - padding})`;
  } else {
    return `translate(${width - padding}, 0)`;
  }
};

interface Props {
  orient: "left" | "right" | "bottom";
  scale: d3.ScaleTime<number, number> | d3.ScaleLinear<number, number>;
}

const Axis = ({ orient, scale }: Props) => {
  console.log("Axis rendered");

  const { width, height, padding } = useContext(ChartContext)!;
  const axisRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (axisRef.current) {
      const axis = getOrientedAxis(width, padding, orient, scale);
      const selection = d3.select(axisRef.current);
      selection
        .call(axis)
        .call((g) =>
          g
            .selectAll(".tick:not(:first-of-type) line")
            .attr("stroke-opacity", 0.5)
            .attr("stroke-dasharray", "2,2")
        );
      if (orient !== "bottom") {
        selection.call((g) => g.select(".domain").remove());
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const transform = getTransformValue(width, height, padding, orient);

  return <g className="axis" ref={axisRef} transform={transform} />;
};

export default React.memo(Axis);
