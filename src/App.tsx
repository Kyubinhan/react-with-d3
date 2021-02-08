import React from "react";
import Chart from "./graphs/Chart";

const width = 800;
const height = 400;
const padding = 40;

// TODO: Use React.context to pass down measurements
function App() {
  return <Chart width={width} height={height} padding={padding} />;
}

export default App;
