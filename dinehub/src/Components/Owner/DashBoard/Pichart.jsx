import React, { useEffect, useState } from "react";
import Pichart from "react-apexcharts";
import { Auth } from "../../../Api/axiosAuthinstance";
import { useSelector } from "react-redux";
function PichartComponent() {
  const [dishClassification, setDishClassification] = useState([]);
  const { owner } = useSelector((state) => state?.owner?.owner);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Auth.get(
          `/owner/restaurant/classification-chart/${owner}`
        );
        setDishClassification(data?.orderedDishClassification);
      } catch (error) {
        console.log(error, "err in classificaion Pichart");
      }
    };
    fetchData();
  }, [owner]);

  const counts = dishClassification?.map((obj) => obj?.count);
  const classification = dishClassification?.map((obj) => obj?._id);

  const classificationChart = {
    series: counts,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: classification,
      colors: ["#98FB98", "#e03c31"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="flex justify-center">
      <Pichart
        type="pie"
        width={450}
        series={classificationChart?.series}
        options={classificationChart?.options}
      />
    </div>
  );
}

export default PichartComponent;
