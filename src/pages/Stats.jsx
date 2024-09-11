import { Link } from "react-router-dom";
import { useContext } from "react";
import { rangeContext } from "../Context/Range";
import StatComponent from "./statComponent/StatComponent";

const Stats = () => {
  const range = useContext(rangeContext);
  const data = range.calculatedData;

  if (data.distance != 0) {
    return (
      <StatComponent data={data} range={range}/>
    )
   }

  else {
    return (
      <StatComponent data={{distance: 2408, duration: 9124, averageSpeed: 15, topSpeed: 50, score: 57}} range={range}/>
    )

  }
}

export default Stats
