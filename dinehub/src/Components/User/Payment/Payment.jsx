import React, { useEffect, useState } from "react";
import { PaymentFormValidation } from "../../../YupSchema/PaymentFormSchema";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import {paymentDetails} from '../../../helpers/userHelpers'
import { useNavigate } from "react-router-dom";
function Payment() {
  const [orderDishes, setOrderDishes] = useState([]);

const navigate=useNavigate()
  // Getting order details from localstorage
  const data = localStorage.getItem('OrderDetails');
  const orders = JSON.parse(data)
  console.log(orders,"orders in payment");
  const userData=useSelector((state)=>state.user.user)

  // RESTAURANT ID FROM ORDERD DETAILS
  const restaurantId=orders.orderDetails[0].restaurantId
        // USER ID
           const {user}=userData

           let userId={userId:user}
           let ownerId={ownerId:restaurantId}
           let id={id:orders._id}
          
           let datas=Object.assign({},userId,ownerId,id)


           const payment=(datas,bookingAddress)=>{

            paymentDetails(datas,bookingAddress).then((response)=>{

              if(response){
                navigate('/orders')
              }

            })

           }



  // for storing the total value
  let sum = 0;
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      mobile: "",
      address: "",
      additionalInfo: "",
    },
    validationSchema: PaymentFormValidation,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log(values, "this formik values");
      let options = {
        key: "rzp_test_M18IaPXgq2W1BS",
        key_secret: "2YFjY38KdPIM4GfALjiAdnSv",
        amount: sum * 100,
        currency: "INR",
        name: "Dineout ",
        description: "payment ",
        handler: function (response, error) {
          // Gives the respose after the payment finish
          console.log(response, "razorpay resoponse");
          if (response) {
            payment(datas,values)
            console.log(response, "raz response");
          } else {
            console.log(error, "error inda");
          }
        },
        prefill: {
          name: "name",
          email: "email",
          contact: "phone",
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var pay = new window.Razorpay(options);

      pay.open();
    },

    // RazorPayHandler(values)
  });

  const dishes = useSelector((state) => state?.dishes?.dishes.dishDetails);

  

  useEffect(() => {
    setOrderDishes(dishes);
  }, [dishes]);

  // const handlePayment = (sum) => {
  //   if (sum) {
  //     console.log(sum, "this is sum");
  //   } else {
  //     return;
  //   }
  // };

  console.log(orderDishes, "<<>><<>><<>>");
  return (
    <>
      <div className="mt-20">
        {/* <h1 className="flex items-center justify-center font-bold text-blue-600 text-md lg:text-3xl">
        BOOKING DETAILS
        </h1> */}
      </div>
      <div className="container p-12 mx-auto">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full">
            <h2 className="mb-4 font-bold md:text-xl text-heading ">
              BOOKING DETAILS
            </h2>
            <form
              className="justify-center w-full mx-auto"
              onSubmit={formik.handleSubmit}
            >
              <div className="">

                <div className="space-x-0 lg:flex lg:space-x-4 mt-2">
                  <div className="w-full lg:w-1/2">
                    <label
                      htmlFor="email"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Email"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 my-2">{formik.errors.email}</p>
                    )}
                  </div>


                  <div className="w-full lg:w-1/2">
                    <label
                      htmlFor="firstName"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      First Name
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <p className="text-red-500 my-2">
                        {formik.errors.firstName}
                      </p>
                    )}
                  </div>
                  


                </div>
                {/* <div className="mt-4">
                                <div className="w-full">
                                    <label htmlFor="Email"
                                        className="block mb-3 text-sm font-semibold text-gray-500">Email</label>
                                    <input name="Last Name" type="text" placeholder="Email"
                                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                                </div>
                            </div> */}
                {/* <div className="mt-4">
                  <div className="w-full">
                    <label
                      htmlFor="Address"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Address
                    </label>
                    <textarea
                      className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      name="address"
                      cols="20"
                      rows="4"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.address}
                      placeholder="Address"
                    ></textarea>
                    {formik.touched.address && formik.errors.address && (
                      <p className="text-red-500 my-2">
                        {formik.errors.address}
                      </p>
                    )}
                  </div>
                </div> */}
                <div className="space-x-0 flex justify-center lg:flex lg:space-x-4">
                  

                <div className="w-full lg:w-1/2 ">
                    <label
                      htmlFor="mobile"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Mobile
                    </label>
                    <input
                      name="mobile"
                      min="0"
                      ma="10"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.mobile}
                      type="number"
                      placeholder="Mobile Number"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {formik.touched.mobile && formik.errors.mobile && (
                      <p className="text-red-500 my-2">
                        {formik.errors.mobile}
                      </p>
                    )}
                  </div>


                </div>

                <div className="relative pt-3 xl:pt-6">
                  <label
                    htmlFor="note"
                    className="block mb-3 text-sm font-semibold text-gray-500"
                  >
                    {" "}
                    Any Additional Requirement (Optional)
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formik.values.additionalInfo}
                    onChange={formik.handleChange}
                    className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                    rows="4"
                    placeholder="eg:dish recipies or party information"
                  ></textarea>
                </div>
                <div className="mt-4">
                  <button
                    className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900"
                    type="submit"
                    // onClick={handlePayment}
                  >
                    Process
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
            <div className="pt-12 md:pt-0 2xl:ps-4">
              <h2 className="text-xl font-bold">Order Summary</h2>keLinejoin
              <div className="mt-8">
                <div className="flex flex-col space-y-4">
                  {/* CARD OPEN */}
                  {orderDishes?.map((dish, index) => {
                    sum += dish.total;
                    console.log(sum, "sum");
                    return (
                      <div key={index} className="flex space-x-4">
                        <div>
                          <img
                            src={dish ? dish.image.url : ""}
                            alt="dish"
                            className="w-60"
                          />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">{dish.dishName}</h2>
                      
                          <p className="text-sm">Qty: {dish.count}</p>
                          <span className="text-red-600">PRICE</span> Rs:
                          {dish.price}
                          
                        </div>
                      </div>
                    );
                  })}
                  {/* CARD CLOSE */}
                </div>
              </div>
              <div className="flex p-4 mt-4">
                <h2 className="text-xl font-bold">
                  ITEMS {orderDishes?.length}
                </h2>
              </div>
              {/* <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Subtotal<span className="ml-2">$40.00</span>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Shipping Tax<span className="ml-2">$10</span>
              </div> */}
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Total<span className="ml-2">RS :{sum}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
