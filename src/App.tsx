import React, { useState, useEffect } from "react";

import EmojiVsReactions from "./emoji-vs-reactions.json";
import Chart from "./graphs/Chart";
import { ChartContext, measurements } from "./graphs/ChartContext";
import { calculateScales, Data, parseJson, Scales } from "./graphs/utils";

type State = {
  data: Data;
  scales: Scales;
};

function App() {
  const [state, setState] = useState<State | null>(null);

  // Simulate data fetch
  useEffect(() => {
    const data = parseJson(EmojiVsReactions);
    const scales = calculateScales(data, measurements);

    setState({ data, scales });
  }, []);

  if (!state) {
    return null;
  }

  const { data, scales } = state;

  return (
    <ChartContext.Provider value={measurements}>
      <Chart data={data} scales={scales} />
    </ChartContext.Provider>
  );
}

export default App;
