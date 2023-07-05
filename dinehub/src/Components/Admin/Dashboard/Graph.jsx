import React, { useEffect, useState } from "react";
import Apexcharts from "react-apexcharts";
import { adminYearlyData } from "../../../helpers/adminHelpers";
import {adminDailyData} from "../../../helpers/adminHelpers"
import {adminMonthlyData} from '../../../helpers/adminHelpers'
function Graph() {
  const [data, setData] = useState([]);
 const [daily,setDaily]=useState([])
 const [monthly,setMonthly]=useState([])
 
  const curentYear=new Date().getFullYear()

  const options= {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [curentYear],
    },
  }

 const series= [
    {
      name: "series-1",
      data: data,
    },
  ]

  useEffect(() => {
    adminYearlyData()
      .then((res) => {
        // console.log(res,"final response");
        if (res) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const MonthlyDays=daily?.map((item)=>item?.day)
  const DailySales=daily?.map((item)=>item?.totalSales)

  const dailyChart = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: MonthlyDays,
        tickPlacement: "between",
      },
    },
    series: [
      {
        name: "series-1",
        data: DailySales,
      },
    ],
  };

    

  useEffect(()=>{
    adminDailyData().then((res)=>{
        if(res){
          setDaily(res.data)
        }
    })
  },[])

 

  useEffect(()=>{
    adminMonthlyData().then((res)=>{
       if(res){
        setMonthly(res.data)
       }
    })
  },[])

  const monthlyChart = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: monthly?.map((item)=>item?.month),
        tickPlacement: "between",
      },
    },
    series: [
      {
        name: "series-1",
        data: monthly?.map((item)=>item?.totalSales),
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
              <Apexcharts
                options={options}
                series={series}
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
              <Apexcharts
                options={dailyChart?.options}
                series={dailyChart?.series}
                type="bar"
                width="600"
              />
            </div>
          </div>
        </div>


        <div className="app mt-4">
          <h2 className="text-2xl font-bold text-black">MONTHLY DATA</h2>
          <div className="row">
            <div className="mixed-chart">
              <Apexcharts
                options={monthlyChart?.options}
                series={monthlyChart?.series}
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

export default Graph;
