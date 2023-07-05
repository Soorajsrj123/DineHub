import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getRestaurant } from "../../helpers/userHelpers";
import { getRestaurantTables } from "../../helpers/userHelpers";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import {averageRating} from '../../helpers/ownerHelpers'
import { bookedOrders } from "../../helpers/userHelpers";
import { checkOutData } from "../../helpers/userHelpers";
import {MapComponent} from '../../Components/User/Map/Map'
import "react-datepicker/dist/react-datepicker.css";

function CheckOutComponent() {
  // const currentDate = new Date();
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState("");
  const [table, setTable] = useState([]);

  //  USERID FROM PERSISTED DATA
  const userData = useSelector((state) => state?.user?.user);
  const userId = userData?.user;
  // console.log(userId, "userId");
  //  USER SELECTED DATE STATE
  const [date, setDate] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState("");
  const [time, setTime] = useState(new Date());
  const [button, setButton] = useState(false);
  const [preOrder, setPreOrder] = useState([]);
  const [coordinate,setCordinates]=useState('')

  const allDishData = useSelector((state) => state?.dishes?.dishes?.dishDetails);

  const filteredDishes = allDishData?.filter((item) => item?.count > 0);

  //  NEED TO CHANGE THIS METHOD HERE FINDING THE RES ID FROM PERSISTED DATA ITS NOT GOOD WAY
  const resId = useSelector(
    (state) => state?.dishes?.dishes?.dishDetails[0]?.restaurantId
  );

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
    const hours = currentTime?.getHours();
    // console.log(hours, "hours");
    const minutes = currentTime?.getMinutes();
    // console.log(minutes, "minutes");

    // formating in to 09:00 PM format
    const formattedTime = `${hours?.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;

    // console.log(formattedTime, "formated time");
    // PUSU TIME TO THE TIMELIST
    timeList?.push(formattedTime);

    // Adding 1 Hour with start time to get the new current time
    currentTime = new Date(currentTime?.getTime() + 60 * 60 * 1000);
    // console.log(currentTime, "current Time");
  }

  useEffect(() => {
    // fetching restaurant details
    getRestaurant(resId)
      .then((data) => {
        // console.log(data);
        if (data?.status) {
          setCordinates(data?.restaurant?.address)
          setRestaurantData(data?.restaurant);
        }
      })
      .catch((err) => {
        console.log(err,"Error in Checkout componet");
        toast.error(err.message);
      });

    getRestaurantTables(resId).then((data) => {
      if (data?.status) {
        setTable(data?.tables);
      }
    });

  
  }, []);

  // FOR GETTING THE USER SELECTED DATE
  const selectedDay = (selectedDay) => {
    // const startDate = new Date(selectedDay);
    //   console.log(startDate,"selected date in date format");
    // const startDateString = startDate.toLocaleDateString();
    //   console.log(startDateString,"in date string");
    // SET THE SELECTED DATE TO STATE
    setDate(selectedDay);
  };

  // HANDILING PAYMENT

  const handlePayment = () => {
    if (
      !filteredDishes &&
      !button &&
      !selectedValue &&
      !userId &&
      !date &&
      !time
    ) {
      toast.error("please select all the datas");
      return;
    }
    const startDate = new Date(date);
    const startDateString = startDate?.toLocaleDateString();

    const allData = {
      filteredDishes,
      button,
      selectedValue,
      userId,
      startDateString,
      time,
    };

    checkOutData(allData)
      .then((res) => {
        const order = res?.data;

        localStorage.setItem("OrderDetails", JSON.stringify(order));
        navigate("/payment");
      })
      .catch((err) => {
        console.log(err, "errr in Checkout Data");
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
    const startDate = new Date(date);
    const startDateString = startDate?.toLocaleDateString();
 
    bookedOrders(userId, startDateString, time).then((data) => {
      setPreOrder(data?.data);
    });
    // IT CALLS ONLY WHEN DATE OR TIME CHANGES SO THEN IF FETCH ORDER DATA .FROM THAT DATA I AM DISPLAYING THE TABLE WHICH IS NOT BOOKED
  }, [date, time]);

  const tableNumbers = preOrder?.map((obj) => obj?.tableNo);

  const filteredData = table?.filter((obj) => !tableNumbers?.includes(obj?.tableNumber)
  );

  //  TO GET AVARAGE REVIEW

  // useEffect(()=>{

  //   const avgRating= averageRating()
  // },[])

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
              {restaurantData?.restaurantName?.toUpperCase()}
            </h3>

            <p className="mt-4 text-lg font-semibold text-black-300">
              {restaurantData?.description?.toUpperCase()}
            </p>

            <div class="flex justify-center mt-3">
              <button class="bg-gray-100 border-2 border-black pl-3 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 512 512">
            <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
          </svg> */}
                <span class="ml-4 flex items-start flex-col leading-none">
                  <span class="text-xs text-gray-600 mb-1">Starting Time</span>
                  <span class="title-font font-medium">
                    {restaurantData?.startTime}
                  </span>
                </span>
              </button>
              <button class="bg-gray-100 border-2 border-black inline-flex py-3 px-5 rounded-lg items-center ml-4 hover:bg-gray-200 focus:outline-none">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 305 305">
            <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
            <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
          </svg> */}
                <span class="ml-4 flex items-start flex-col leading-none pr-3 ">
                  <span class="text-xs text-gray-600 mb-1">Ending Time</span>
                  <span class="title-font font-medium">
                    {restaurantData?.endTime}
                  </span>
                </span>
              </button>
            </div>
          </a>

          {/*  */}

          {coordinate?.geometry?.coordinates[1] && coordinate?.geometry?.coordinates[0] && (
  <MapComponent
    latitude={coordinate?.geometry?.coordinates[1]}
    longitude={coordinate?.geometry?.coordinates[0]}
  />
)}

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
              selected={date}
              onChange={selectedDay}
              minDate={new Date()}
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
                <option value={"chooseTime"} defaultValue={"chooseTime"}>
                  Choose Your Time
                </option>
                <option value="Breakfast">BreakFast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>

            {/* select time */}
            <div className=" grid grid-cols-6 gap-x-20 gap-y-3 my-2   overflow-auto mx-4">
              {timeList?.map((items, index) => {
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
                  {filteredData?.map((table, index) => {
                    return (
                      <div key={index}>
                        <button
                          disabled
                          onClick={handleClick}
                          value={table?.tableNumber}
                          type="button"
                          className="rounded-md bg-green-600 hover:text-gre-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          Table {table?.tableNumber}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3 m-5 pt-4">
                  {filteredData?.map((table, index) => {
                    return (
                      <div key={index}>
                        <button
                          onClick={handleClick}
                          value={table?.tableNumber}
                          type="button"
                          style={{ backgroundColor: " #8458B3" }}
                          className="rounded-md bg-violet-700 hover:text-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                          Table {table?.tableNumber}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="text-center m-3">
              {button && (
                <Link
                  onClick={handlePayment}
                  type="button"
                  className="w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  proceed payment
                </Link>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default CheckOutComponent;
