import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserOrderDetails } from "../../../helpers/userHelpers";
import { Toaster, toast } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./Alert.css";
import {
  getRestaurantDetails,
  cancelBooking,
} from "../../../helpers/userHelpers";
import { useNavigate } from "react-router-dom";
// import './OrderDetails.css'
function OrderDetails() {
  // STORING ORDER DETAILS
  const [orders, setOrders] = useState([]);
  const navigate=useNavigate()
  // STORING RESTAURANT ID
  const [resId, setResId] = useState("");
  // STORING RESTAUTANT DATA
  const [restaurant, setRestaurant] = useState([]);

  const userData = useSelector((state) => state.user.user);

  const { user } = userData;

  let sum = 0;

  useEffect(() => {
    UserOrderDetails(user)
      .then((data) => {
        if (data) {
          // SET OWNERID IN IN STATE
          setResId(data?.UserOrders[0]?.orderDetails[0]?.restaurantId);
          // SET ORDERS IN STATE
          setOrders(data?.UserOrders);
        } else {
          toast.error("sorry page not found");
        }
      })
      .catch((err) => {
             if(err.response.status===401){
              navigate('/login')
             }
      });
  }, [user,navigate]);

  const bookingCancelConfirm = (orderId, userId) => {
    confirmAlert({
      title: "Cancel Booking Confirmation",
      message: "Are you sure you want to cancel the booking?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const response = cancelBooking(orderId, userId);
            response
              .then((res) => {
                if (res) {
                  toast.success("Booking Canceled");
                  setOrders(res?.newOrderDetails);
                } else {
                  toast.error("Something went wrong");
                }
              })
              .catch((err) => {
                console.log(err,"err");
                 if(err.response.status===401){
                  navigate('/login')
                 }
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            // Handle the negative action (e.g., cancel operation)
            console.log("You clicked No");
          },
        },
      ],
    });
  };

  useEffect(() => {
    getRestaurantDetails(resId)
      .then((res) => {
        if (res) {
          setRestaurant(res?.restaurantDetails);
        } else {
          toast.error(res?.message);
        }
      })
      .catch((err) => {
        console.log(err, "error in order details");
      });
  }, [resId]);

  const handleCancel = async (orderId, userId) => {
    bookingCancelConfirm(orderId, userId);
  };
  return (
    <>
      <div>
        {orders?.map((item, index) => {
          const timestamp = item?.updatedAt;
          const date = new Date(timestamp);

          // Extracting date components
          const year = date?.getFullYear();
          const month = date?.getMonth() + 1; // Months are zero-indexed, so we add 1
          const day = date?.getDate();

          // Extracting time components
          const hours = date?.getHours();
          const minutes = date?.getMinutes();
          const seconds = date?.getSeconds();

          return (
            <div
              key={index}
              className="py-14 border-b-2 border-gray-400 px-4  md:px-6 2xl:px-20 2xl:container 2xl:mx-auto"
            >
              <div className="flex justify-start item-start space-y-2 flex-col ">
                <Toaster position="top-center" reverseOrder={false}></Toaster>

                <p className=" lg:text-xl font-semibold leading-7 lg:leading-9  text-gray-800">
                  Date:{year ? year : ""}-{month ? month : ""}-{day ? day : ""}
                </p>
                <p className="text-base font-medium leading-6 text-gray-600">
                  Time:{hours ? hours : ""}:{minutes ? minutes : ""}:
                  {seconds ? seconds : ""}
                </p>
              </div>
              <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                  <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                    <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                      Table NO:{item?.tableNo}
                    </p>
                    {item?.orderDetails?.map((dish, index) => {
                      sum = sum + dish?.total;

                      return (
                        <div
                          key={index}
                          className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
                        >
                          <div className="pb-4 md:pb-8 w-full md:w-40">
                            <img
                              className="w-full hidden md:block"
                              src={dish?.image?.url}
                              alt="dress"
                            />
                          </div>

                          <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                              <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                                {dish?.dishName}
                              </h3>
                              <div className="flex justify-start items-start flex-col space-y-2">
                                <p className="text-sm leading-none text-gray-800">
                                  <span className="text-gray-600">
                                    catagory:{" "}
                                  </span>
                                  {dish?.category}
                                </p>
                                <p className="text-sm leading-none text-gray-800">
                                  <span className="text-gray-600">price: </span>{" "}
                                  {dish?.price}
                                </p>
                                {item?.isCancelled ? (
                                  <p className="text-sm leading-none text-red-800">
                                    <span className="text-gray-300">
                                      status:{" "}
                                    </span>{" "}
                                    Cancelled
                                  </p>
                                ) : (
                                  <p className="text-sm leading-none text-green-800">
                                    <span className="text-gray-300">
                                      status:{" "}
                                    </span>{" "}
                                    Placed
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between space-x-8 items-start w-full">
                              <p className="text-base xl:text-lg leading-6">
                                <span className="text-red-500 ">
                                  Total :{dish?.total}
                                </span>
                              </p>
                              <p className="text-base xl:text-lg leading-6 text-gray-800">
                                {dish?.count}
                              </p>
                              <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                                {item?.orderType}
                              </p>
                              <div>
                                {item?.isCancelled ? (
                                  <button
                                    disabled
                                    className="bg-red-100 hover:bg-red-100 text-white font-bold py-2 px-4 rounded-full"
                                  >
                                    Cancel
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      handleCancel(item?._id, user);
                                    }}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                  >
                                    Cancel
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                      <h3 className="text-xl font-semibold leading-5 text-gray-800">
                        Summary
                      </h3>
                      <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                        <div className="flex justify-between  w-full">
                          <p className="text-base leading-4 text-gray-800">
                            Subtotal
                          </p>
                          <p className="text-base leading-4 text-gray-600">
                            Rs: {sum}
                          </p>
                        </div>
                        {/* <div className="flex justify-between items-center w-full">
                      <p className="text-base leading-4 text-gray-800">
                        Discount{" "}
                        <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">
                          STUDENT
                        </span>
                      </p>
                      <p className="text-base leading-4 text-gray-600">
                        -$28.00 (50%)
                      </p>
                    </div> */}
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base font-semibold leading-4 text-gray-800">
                          Total
                        </p>
                        <p className="text-base font-semibold leading-4 text-gray-600">
                          RS: {sum}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                  <h3 className="text-xl font-semibold leading-5 text-gray-800">
                    Restaurant
                  </h3>
                  <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                    <div className="flex flex-col justify-start items-start flex-shrink-0">
                      <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                        <img
                          className="w-32"
                          src="https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg"
                          alt="avatar"
                        />
                        <div className=" flex justify-start items-start flex-col space-y-2">
                          {/* <p className="text-base font-semibold leading-4 text-left text-gray-800">{restaurant.email}</p> */}
                        </div>
                      </div>

                      <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                            stroke="#1F2937"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 7L12 13L21 7"
                            stroke="#1F2937"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="cursor-pointer text-sm leading-5 text-gray-800">
                          {restaurant?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                      <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                        <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                          <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                            {" "}
                            Address
                          </p>
                          <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                            {restaurant?.address?.place_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* pagination */}

        <div class="flex flex-col items-center ">
          <div class="inline-flex mt-2 xs:mt-0">
            <button
              // disabled={page === 1}
              // onClick={handlePrev}

              class="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Prev
            </button>
            <button
              // disabled={page === pageCount}
              // onClick={handleNext}
              class="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </div>
        </div>
        {/* end */}
      </div>
    </>
  );
}

export default OrderDetails;
