import React, { useContext } from "react";

import { ChartContext } from "./ChartContext";

interface Props {
  mousePos: [number, number] | null;
}

const MouseLine = ({ mousePos }: Props) => {
  const { width, height, padding } = useContext(ChartContext)!;

  if (mousePos) {
    const x = mousePos[0];
    const y = mousePos[1];
    const isMouseHoveringChart = (padding <= x && x <= width - padding) && (padding <= y && y <= height - padding) // prettier-ignore

    if (isMouseHoveringChart) {
      return (
        <>
          <line
            className="mouse-line"
            x1={x}
            y1={padding}
            x2={x}
            y2={height - padding}
          />
          <line
            className="mouse-line"
            x1={padding}
            y1={y}
            x2={width - padding}
            y2={y}
          />
        </>
      );
    }
  }

  return null;
};

export default MouseLine;
// export default React.memo(MouseLine);
