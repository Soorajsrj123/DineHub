import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRestaurants } from "../../helpers/commonHelper";
import { toast } from "react-hot-toast";
function ListRestaurants() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const restaurantDataResponse = getRestaurants();
    restaurantDataResponse
      .then((data) => {
        if (data.status) {
          setRecords(data.Details);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  }, []);

  return (
    <div>
      <div>
       
            <div  className="min-h-screen flex justify-center items-center py-20">
              <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
              {records.map((restaurant,index) => {
          return (
                <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                  <div className="relative">
                    <img
                      className="w-full h-64 rounded-xl"
                      src={restaurant?.image?.url}
                      alt="Colors"
                    />
                  </div>
                  <h3 className="m-2 text-xl font-bold text-indigo-600">
                  {restaurant.restaurantName}
                  </h3>
                  <h5 className="m-2 text-gray-800 text-lg font-bold cursor-pointer">
                    {restaurant.address}
                  </h5>
                  <div className="my-4">
                    <div className="flex space-x-1 items-center">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-indigo-600 mb-1.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            fill="currentColor"
                            d="M6 20v-1h12v1a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zM4 4h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z"
                          />
                        </svg>
                      </span>
                      <b>Tables</b>
                    </div>
                    <div className="flex space-x-1 items-center">
                      <span>
                        <svg
                          height={"16"}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-6 w-6 text-indigo-600 mb-1.5"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            fill="currentColor"
                            d="M17,2H7A2,2,0,0,0,5,4v16a2,2,0,0,0,2,2h10a2,2,0,0,0,2-2V4A2,2,0,0,0,17,2Zm-6,16a1,1,0,1,1,1-1A1,1,0,0,1,11,18Zm4-4a1,1,0,1,1,1-1A1,1,0,0,1,15,14Zm0-4a1,1,0,1,1,1-1A1,1,0,0,1,15,10Z"
                          />
                        </svg>
                      </span>
                      <b>{restaurant.phone}</b>
                    </div>

                    <Link t>
                      <button className="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
                 );
                })}
              </div>
            </div>
         
      </div>
    </div>
  );
}

export default ListRestaurants;
