import React, { useEffect, useState } from "react";
import Apexcharts from "react-apexcharts";
import { adminYearlyData } from "../../../helpers/adminHelpers";
import {adminDailyData} from "../../../helpers/adminHelpers"
function Graph({title}) {
  const [data, setData] = useState([]);
 const [daily,setDaily]=useState([])
 
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
        //   // console.log(res);
        //   const fetchedData = res?.data;
        //   console.log(fetchedData, "fet");

        //   const numericData = Number(fetchedData); // Convert string to number
        //   console.log(numericData, "nuu");
        //   setOptions((previosOptions) => ({
        //     ...previosOptions,
        //     xaxis: {
        //       ...previosOptions.xaxis,
        //       categories: [2023],
        //     },
        //   }));

        //   setSeries((prevSeries) => [
        //     {
        //       ...prevSeries[0],
        //       data: [numericData],
        //     },
        //   ]);
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const options2 = {
    chart: {
    id: "basic-bar"
    },
    xaxis: {
    categories: ['Today']
    }
    };
    
    const series2 = [
    {
    name: "daily report",
    data: [daily]
    }
    ];

  useEffect(()=>{
    adminDailyData().then((res)=>{
       console.log(res,"final response");
      const re= res.dailySales.reduce((accum,obj)=>accum+obj)
console.log(re,"re");
       setDaily(re)
    })
  },[])

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
                options={options2}
                series={series2}
                type="bar"
                width="500"
              />
            </div>
          </div>
        </div>


        {/* <div className="app mt-4">
          <h2 className="text-2xl font-bold text-black">MONTHLY DATA</h2>
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
        </div> */}
      </div>
    </>
  );
}

export default Graph;
