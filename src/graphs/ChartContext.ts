import { createContext } from "react";

export const measurements = {
  width: 800,
  height: 400,
  padding: 40,
};

export const ChartContext = createContext<typeof measurements | null>(null);
