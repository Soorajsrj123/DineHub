import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getRestaurant } from "../../helpers/userHelpers";
import { getRestaurantTables } from "../../helpers/userHelpers";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";

import { bookedOrders } from "../../helpers/userHelpers";
import { checkOutData } from "../../helpers/userHelpers";

import "react-datepicker/dist/react-datepicker.css";
import { setDishes } from "../../Slices/dishSlice";
function CheckOutComponent() {
  const currentDate = new Date();
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState("");
  const [table, setTable] = useState([]);

  const dispatch=useDispatch()
  //  USERID FROM PERSISTED DATA
  const userData = useSelector((state) => state?.user?.user);
  const userId = userData.user;
  // console.log(userId, "userId");
  //  USER SELECTED DATE STATE
  const [date, setDate] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [time, setTime] = useState(new Date());
  const [button, setButton] = useState(false);
  const [preOrder, setPreOrder] = useState([]);

  const allDishData = useSelector((state) => state?.dishes.dishes.dishDetails);
  
  const filteredDishes=allDishData.filter((item)=>item.count>0)


  //  NEED TO CHANGE THIS METHOD HERE FINDING THE RES ID FROM PERSISTED DATA ITS NOT GOOD WAY
  const resId = useSelector(
    (state) => state.dishes.dishes.dishDetails[0].restaurantId
  );
 console.log(resId,"res Id");
  const startTime = restaurantData?.startTime;
  const endTime = restaurantData?.endTime;

  const startDate = new Date(`01/01/2000 ${startTime}`);
  const endDate = new Date(`01/01/2000 ${endTime}`);

  // console.log(startDate, endDate, "start date and endDate");
  const timeList = [];

  let currentTime = startDate;
  // console.log(currentTime, "curent time");
  while (currentTime <= endDate) {
    // Get the current hour and minutes
    const hours = currentTime.getHours();
    // console.log(hours, "hours");
    const minutes = currentTime.getMinutes();
    // console.log(minutes, "minutes");

    // formating in to 09:00 PM format
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;

    // console.log(formattedTime, "formated time");
    // PUSU TIME TO THE TIMELIST
    timeList.push(formattedTime);

    // Adding 1 Hour with start time to get the new current time
    currentTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
    // console.log(currentTime, "current Time");
  }

  useEffect(() => {
    // fetching restaurant details
    getRestaurant(resId)
      .then((data) => {
        // console.log(data);
        if (data.status) {
          setRestaurantData(data.restaurant);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });

    getRestaurantTables(resId).then((data) => {
   
      if (data.status) {
        setTable(data.tables);
      }
    });

    dispatch(
      setDishes({
        dishDetails: filteredDishes,
      })
    )
  }, []);

  // FOR GETTING THE USER SELECTED DATE
  const selectedDay = (selectedDay) => {
    console.log(selectedDay, "val");
    const startDate = new Date(selectedDay);
    console.log(startDate, "start date");
    const startDateString = startDate.toLocaleDateString();
    console.log(startDateString, "start date string");
    // SET THE SELECTED DATE TO STATE
    setDate(startDateString);
  };

  // HANDILING PAYMENT

  const handlePayment = () => {
    console.log(filteredDishes,"fil dishh");
    const allData = { filteredDishes, button, selectedValue, userId, date, time };

    checkOutData(allData)
      .then((res) => {
        const order = res.data;
        console.log(order,"fk");
        localStorage.setItem("OrderDetails", JSON.stringify(order));
        navigate("/payment");
      })
      .catch((err) => {
        console.log(err, "errr");
      });
  };

  // FOR GETTING THE USER SELECTED TIME
  const handleTime = (e) => {
    const selectedTime = e.target?.value;
    //  console.log(selectedTime,"sel time");
    setTime(selectedTime);
  };

  // CALLED WHEN TABLE CLICKED
  const handleClick = (e) => {
    const value = e.target.value;
    setButton(value);
  };

  

  // FOR FETCHING THE BOOKED ORDERS DATA

  useEffect(() => {
    console.log(userId, date, time, "all");
    bookedOrders(userId, date, time).then((data) => {
      console.log(data, "data booked orders");
      setPreOrder(data?.data);
    });
    // IT CALLS ONLY WHEN DATE OR TIME CHANGES SO THEN IF FETCH ORDER DATA .FROM THAT DATA I AM DISPLAYING THE TABLE WHICH IS NOT BOOKED
  }, [date, time]);
console.log(preOrder,"pre");
  const tableNumbers = preOrder?.map((obj) => obj.tableNo);
  console.log(tableNumbers, "table no pre order");
  const filteredData = table?.filter((obj) => !tableNumbers?.includes(obj.tableNumber)
  );
console.log(filteredData,"filtered");
  // console.log(startDate,"data");

  console.log(selectedValue, "selected value");
  return (
    <div>
      <div className="h-screen w-full flex bg-white-800">
        <main className="w-full overflow-y-auto">
          <div className="carousel  mt-6 p-2 ">
            <div id="slide1" className="carousel-item relative w-full">
              <img
                className="h-96 w-full object-cover rounded-md"
                src={restaurantData?.image?.url}
                alt="hh"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>

          {/* restaurant details */}
          <a
            className="me-2 mx-2 block rounded-xl  bg-white-900 p-2 border-slate-400 shadow-xl sm:p-6 lg:p-8"
            href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>

            <h3 className="mt-3 text-lg font-bold text-black sm:text-xl">
              {restaurantData.restaurantName}
            </h3>

            <p className="mt-4 text-sm text-black-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
              {restaurantData.description}
            </p>
          </a>

          {/*  */}

          {/*  */}

          {/* ending restaurant details */}
        </main>

        <article className="rounded-lg border w-96  bg-gray-200  m-6 me-6 p-4">
          <p className="text-center text-lg">Book Table</p>

          <div className="h-full  bg-white rounded-md  mt-5 ">
            <h5 className="text-center text-slate-600">
              choose an available time slot{" "}
            </h5>

            <DatePicker
              selected={currentDate}
              onChange={selectedDay}
              dateFormat="dd/MM/yyyy"
              className="border-2 border-black"
            />

            <div className="p-2">
              <select
                value={selectedValue}
                onChange={(e) => {
                  setSelectedValue(e.target.value);
                }}
                id="countries"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={"chooseTime"} defaultValue={"chooseTime"}>Choose Your Time</option>
                <option value="Breakfast">BreakFast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>

            {/* select time */}
            <div className=" grid grid-cols-6 gap-x-20 gap-y-3 my-2   overflow-auto mx-4">
              {timeList.map((items, index) => {
                return (
                  <div key={index} className=" ">
                    <button
                      value={items}
                      onClick={handleTime}
                      type="button"
                      className="me-5 rounded-md bg-green-700  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      {items}
                    </button>
                  </div>
                );
              })}
            </div>
            {/* end select time */}

            <div>
              {button ? (
                <div className="grid grid-cols-3 gap-3 m-5 pt-4">
                  {filteredData.map((table,index) => {
                    return (
                      <div key={index} >
                        <button
                          disabled
                          onClick={handleClick}
                          value={table.tableNumber}
                          type="button"
                          className="rounded-md bg-green-600 hover:text-gre-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          Table {table.tableNumber}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3 m-5 pt-4">
                  {filteredData.map((table,index) => {
                    return (
                      <div key={index} >
                        <button
                          onClick={handleClick}
                          value={table.tableNumber}
                          type="button"
                          style={{ backgroundColor: " #8458B3" }}
                          className="rounded-md bg-violet-700 hover:text-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                          Table {table.tableNumber}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="text-center m-3">
              <Link
                onClick={handlePayment}
                type="button"
                className="w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                proceed payment
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default CheckOutComponent;
