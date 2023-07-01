import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRestaurantsRequest } from "../../helpers/adminHelpers";
import {RestaurantApprove} from '../../helpers/adminHelpers'
import { toast ,Toaster} from "react-hot-toast";
import MyModal from "./Modal";
import Swal from "sweetalert2";
function ViewRequestComponent() {
  const [restaurantData, setRestaurantData] = useState([]);
 const [modal,setModal]=useState(false)
  const {id} = useParams();
 const navigate=useNavigate()
  useEffect(() => {
    getRestaurantsRequest(id)
      .then((data) => {
        setRestaurantData(data.restaurantData);
      })
      .catch((err) => console.log(err));
  }, [id]);
  console.log(restaurantData, "final data");

//   function for accept request
  const AcceptRequestHandler=async()=>{


    Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure for Approving this Request!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, approve!'
    }).then((result) => {
        if(result.isConfirmed){
            const approve= RestaurantApprove(id)   
            //    console.log(id,"res id here >>>>");
             toast.promise(approve, {
                loading: 'Loading ',
                success: <b>Restaurant Registered  successfully</b>,
                error: <b>Error: Unable to Approve the Form</b>
            })

           approve.then((data)=>{
                     if(data){
                        // toast.success("Restaurant resgitered success")
                        navigate('/admin/access-control')
                     }
                     
            }).catch((err)=>{
                toast.error("registration failed")
                console.log("here is the error:",err);
            })
            Swal.fire(
                'Accepted!',
                'Restaurant request accepted',
                'success'
            )
        }

    })

  }

  const CloseModal=()=>{
    return setModal(false)
  }

  // const RejectRequestHandler=()=>{
  //   Swal.fire({
  //       title: 'Are you sure?',
  //       text: "Are you sure for Reject this Request!",
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, confirm!'
  //   }).then((result) => {
  //       if(result.isConfirmed){
  //           const reject= RejectRestaurant(id)   
  //           //    console.log(id,"res id here >>>>");
  //            toast.promise(reject, {
  //               loading: 'Loading ',
  //               success: <b>Registration Rejected  successfully</b>,
  //               error: <b>Error: Unable Reject the Form</b>
  //           })

  //          reject.then((data)=>{
  //                    if(data){
  //                       // toast.success("Restaurant resgitered success")
  //                       navigate('/admin/access-control')
  //                    }
                     
  //           }).catch((err)=>{
  //               toast.error("registration failed")
  //               console.log("here is the error:",err);
  //           })
  //           Swal.fire(
  //               'Rejected!',
  //               'Restaurant request Rejected',
  //               'success'
  //           )
  //       }

  //   })
  // }

 
  

  return (
    <div>
      <main className="py-14  ">
        <div className="max-w-screen-xl mx-auto py-5 text-gray-600 md:px-8 border border-gray-200 shadow-md rounded-lg ">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

          <div className="max-w-lg mx-auto space-y-3 sm:text-center">
            <h3 className="text-indigo-600 font-semibold">DineHub</h3>
            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Registration
            </p>
            <p>We’d love to hear from you! Please fill out the form bellow.</p>
          </div>
          <div className="mt-12 w-2/4 max-w-lg mx-auto  ">
            <form className="space-y-5 ">
              <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                <div>
                  <label className="font-medium">Restaurant Name</label>
                  <input
                    type="text"
                    name=""
                    // placeholder={restaurantData.restaurantName}
                    value={restaurantData?.restaurantName}
                    required
                    disabled
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium">Manager Name</label>
                  <input
                    type="text"
                    name="ownerName"
                    // placeholder={restaurantData.ownerName}
                    value={restaurantData?.ownerName}
                    disabled
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={restaurantData.email}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Phone number</label>
                <div className="relative mt-2">
                  <input
                    type="number"
                    name="phone"
                    value={restaurantData.phone}
                    disabled
                    required
                    className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium">Address</label>
                <input
                  type="text"
                  value={restaurantData?.address?.place_name}
                  disabled
                  required
                  name="address"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                <div>
                  <label className="font-medium">Tables</label>
                  <input
                    type="number"
                    value={restaurantData.tables}
                    disabled
                    name="tables"
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium">FSSC</label>
                  <input
                    type="text"
                    value={restaurantData.fssc}
                    disabled
                    name="fssc"
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>

              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                facilities
              </h3>
              <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      name="wifi"
                      id="vue-checkbox-list"
                      checked={restaurantData.wifi}
                      disabled
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="vue-checkbox-list"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Wifi
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      name="parking"
                      disabled
                      id="react-checkbox-list"
                      checked={restaurantData.parking}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="react-checkbox-list"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Parking
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      name="aircondition"
                      id="angular-checkbox-list"
                      value={restaurantData.aircondition}
                      disabled
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="angular-checkbox-list"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Air Conditioner
                    </label>
                  </div>
                </li>
              </ul>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                <div className="grid grid-cols-1">
                  <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                    Start Time
                  </label>
                  <input
                    className="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                    type="text"
                    placeholder="Mobile"
                    name="mobile"
                    value={restaurantData?.startTime}
                    disabled
                  />
                </div>
                <div className="grid grid-cols-1">
                  <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                    End Time
                  </label>
                  <input
                    className="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                    type="text"
                    placeholder="fees"
                    name="fees"
                    value={restaurantData?.endTime}
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="font-medium">Description</label>
                <textarea
                  type="text"
                  name="description"
                  disabled
                  value={restaurantData.description}
                  className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                >
                  {restaurantData.description}
                </textarea>
              </div>

              <div className="py-5  flex justify-center ">
                {restaurantData.image && (
                  <img
                    src={restaurantData?.image.url}
                    alt="Preview"
                    className="w-80 "
                  />
                )}
              </div>
              <div className="flex justify-center ">
                <button
                  type="button"
                  onClick={AcceptRequestHandler}
                  className="w-1/3 mr-3 py-2 text-white font-medium bg-green-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={()=>setModal(true)}
                  className="w-1/3 ml-3 py-2 text-white font-medium bg-red-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                  Reject
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </main>
      {modal && <MyModal CloseModal={CloseModal}  restaurantId={id}  />}
    </div>
  );
}

export default ViewRequestComponent;
