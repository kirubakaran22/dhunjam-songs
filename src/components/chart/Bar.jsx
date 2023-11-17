import "./Bar.css";

function Bar(props) {
  let barFillHeight = "0%";
  if (props.maxValue > 0)
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + "%";

  return (
    <div className="chart-bar">
      <div className="inner">
        <div className="fill" style={{ height: barFillHeight }}></div>
      </div>
      <div className="label">{props.label}</div>
    </div>
  );
}

export default Bar;
