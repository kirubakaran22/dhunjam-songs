import { motion } from "framer-motion";

import "./Bargraph.css";
import Bar from "./Bar";

function Bargraph(props) {
  let barData = [
    { label: "Custom", value: props.graphData?.category_6 },
    { label: "Category 1", value: props.graphData?.category_7 },
    { label: "Category 2", value: props.graphData?.category_8 },
    { label: "Category 3", value: props.graphData?.category_9 },
    { label: "Category 4", value: props.graphData?.category_10 },
  ];

  const dataPointValues = barData.map((dataPoint) => dataPoint.value);
  const max = Math.max(...dataPointValues);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, height: 0 }}
      animate={{ opacity: 1, scale: 1, height: "auto" }}
      exit={{ opacity: 0, scale: 0 ,height:0}}
      className="graph-container"
    >
      <div className="rupees">&#8377;</div>
      <div className="graph">
        {barData.map((dataPoint) => (
          <Bar
            key={dataPoint.label}
            value={dataPoint.value}
            maxValue={max}
            label={dataPoint.label}
          />
        ))}
      </div>
    </motion.div>
  );
}
export default Bargraph;
