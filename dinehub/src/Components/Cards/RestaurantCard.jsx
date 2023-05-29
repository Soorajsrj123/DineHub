import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getdata } from "../../helpers/ownerHelpers";
import { deleteRes } from "../../helpers/ownerHelpers";
import { RotatingLines} from 'react-loader-spinner'
function RestaurantCard() {
  const [restaurants, setRestaurants] = useState([]);
  const [loader,setLoader]=useState(false)
  const data = useSelector((state) => state.owner.owner);
  const owner = data.owner;

  const handledelete = async (restaurantId) => {
    try {
      const confirmdelete = window.confirm("are you sure ");
      if (confirmdelete) {
        const response = deleteRes(restaurantId);
        response
          .then((data) => {
            if (data) {
              window.location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };


  

  useEffect(() => {
    try {
        const fetchData=async()=>{
      setLoader(true)
  const response =await getdata(owner);
        setTimeout(()=>{
          setRestaurants(response.restaurants);
          setLoader(false)
        },1500)

 }
 fetchData()
    } catch (error) {
      console.log(error);
    }
  },[owner]);

  return (

    <div>

      {/* ADD RESTORENT  */}
      <div>
        <Link to="/owner/add-restaurant">
          <button className="flex mx-auto sm:mx-16 px-6 sm:px-8 py-3 sm:py-4 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
            Add Restaurants
          </button>
        </Link>
      </div>
      {/* Button End */}


{
  loader?(
    <div className="flex justify-center mt-8">
   <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/>
        </div>
  ):
<div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {restaurants?.map((restaurant, index) => {
          return (
            <div
              key={index}
              className="rounded  overflow-hidden shadow-lg dark:shadow-gray-800"
            >
              <img
                className="w-3/4  ml-16"
                src={restaurant.image.url}
                alt="Mountain"
                
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {restaurant.restaurantName}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-base">
                  {restaurant.address}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="font-semibold">phone :</span>
                <span className="inline-block dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2">
                  {restaurant.phone}
                </span>
                <span className="font-semibold">time :</span>
                <span className="  inline-block bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2">
                  {restaurant.time}
                </span>
                <span className="font-semibold">table :</span>
                <span className="inline-block bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2">
                  {restaurant.tables}
                </span>
                <div className="flex justify-center my-6">
               <Link to={`/owner/edit-restaurant/${restaurant._id}`}>  <button  className="bg-blue-700 text-white rounded-md mx-2 px-4 py-2">
                    edit
                  </button>
                  </Link>
                  <button
                    onClick={() => handledelete(restaurant._id)}
                    className="bg-red-600 text-white rounded-md mx-2 px-4 py-2"
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
}
   
    </div>
  );
}

export default RestaurantCard;
