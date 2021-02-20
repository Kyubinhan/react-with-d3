import React, { useState, useEffect } from "react";

import EmojiVsReactions from "./emoji-vs-reactions.json";
import Chart from "./graphs/Chart";
import { ChartContext, measurements } from "./graphs/ChartContext";
import { calculateScales, Data, parseJson, Scales } from "./graphs/utils";

function App() {
  const [data, setData] = useState<Data | null>(null);
  const [scales, setScales] = useState<Scales | null>(null);

  // Simulate data fetch
  useEffect(() => {
    const data = parseJson(EmojiVsReactions);
    setData(data);

    const flattenData = Object.values(data).flat();
    const scales = calculateScales(flattenData, measurements);
    setScales(scales);
  }, []);

  return (
    <ChartContext.Provider value={measurements}>
      <Chart data={data} scales={scales} />
    </ChartContext.Provider>
  );
}

export default App;
