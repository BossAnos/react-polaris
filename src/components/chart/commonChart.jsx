import "./commonChart.scss";

function CommonChart({ children, value, label }) {
  return (
    <div className="common-list">
      <div className="common-label">{label}</div>
      <div className="common-value">{value}</div>
      {children}
    </div>
  );
}

export default CommonChart;
