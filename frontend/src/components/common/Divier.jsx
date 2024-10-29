function Divier({ border, color }) {
  const borderBottom = border ? "border-b-" + border : "border-b-2";
  //  border-gray-300';
  const borderColor = color ? "border-" + color : "border-gray-300";

  return <div className={borderBottom + " " + borderColor} />;
}

export default Divier;
