import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ownerYearlyReport } from "../../../helpers/ownerHelpers";
import { ownerMonthlyReport } from "../../../helpers/ownerHelpers";
import { ownerDailyReport } from "../../../helpers/ownerHelpers";
import { useSelector } from "react-redux";
function Charts() {
  const [report, setReport] = useState([]);
  const [mothlyReport, setMonthlyReport] = useState([]);
  const [dailyReport, setDailyReport] = useState([]);
  //   getting restaurantId from redux
  const restaurantData = useSelector((state) => state?.owner?.owner);
  const { owner } = restaurantData;

  useEffect(() => {
    const fetchData = async () => {
      const response = await ownerYearlyReport(owner);
      setReport(response?.data);
    };
    fetchData();
  }, [owner]);

  // taking years from the response
  const years = report?.map((obj) => obj?._id?.year);
  //  taking totalSales value from the response
  const sales = report?.map((obj) => obj?.totalSales);

  const yearlyReport = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: years,
      },
    },
    series: [
      {
        name: "series-1",
        data: sales,
      },
    ],
  };

  //   MONTHLY REPORT
  useEffect(() => {
    const fetchData = async () => {
      const response = await ownerMonthlyReport(owner);

      setMonthlyReport(response?.data);
    };
    fetchData();
  }, [owner]);

  const months = mothlyReport?.map((obj) => obj?.month);

  //  taking totalSales value from the response
  const monthlySales = mothlyReport?.map((obj) => obj?.totalSales);

  const monthlyChart = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: months,
      },
    },
    series: [
      {
        name: "series-1",
        data: monthlySales,
      },
    ],
  };

  useEffect(() => {
    const fetchDailyData = async () => {
      const details = await ownerDailyReport(owner);
      setDailyReport(details?.formattedData);
    };
    fetchDailyData();
  }, [owner]);

  const days = dailyReport?.map((obj) => obj?.day);

  //  taking totalSales value from the response
  const DailySales = dailyReport?.map((obj) => obj?.totalSales);

  const dailyChart = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: days,
      },
    },
    series: [
      {
        name: "series-1",
        data: DailySales,
      },
    ],
  };

  return (
    <>
      <div className="mx-20 grid grid-cols-2 gap-2">
        <div className="app mt-4">
          <h2 className="text-2xl font-bold text-black">YEARLY DATA</h2>
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={yearlyReport?.options}
                series={yearlyReport?.series}
                type="bar"
                width="500"
              />
            </div>
          </div>
        </div>

        <div className="app mt-4">
          <h2 className="text-2xl font-bold text-black">MONTHLY DATA</h2>
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={monthlyChart?.options}
                series={monthlyChart?.series}
                type="bar"
                width="500"
              />
            </div>
          </div>
        </div>

        <div className="app mt-4">
          <h2 className="text-2xl font-bold text-black">DAILY DATA</h2>
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={dailyChart?.options}
                series={dailyChart?.series}
                type="bar"
                width="500"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Charts;
