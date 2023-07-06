import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getdata } from "../../helpers/ownerHelpers";
// import { deleteRes } from "../../helpers/ownerHelpers";
import { RotatingLines } from "react-loader-spinner";
function RestaurantCard() {
  const [restaurant, setRestaurant] = useState("");
  const [loader, setLoader] = useState(false);
  const data = useSelector((state) => state.owner.owner);
  const RestaurantId = data.owner;

  // const handledelete = async (restaurantId) => {
  //   try {
  //     const confirmdelete = window.confirm("are you sure ");
  //     if (confirmdelete) {
  //       const response = deleteRes(restaurantId);
  //       response
  //         .then((data) => {
  //           if (data) {
  //             window.location.reload();
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoader(true);
        const response = await getdata(RestaurantId);
        setTimeout(() => {
          setRestaurant(response?.restaurant);
          setLoader(false);
        }, 1500);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [RestaurantId]);

  return (
    <div>
      {loader ? (
        <div className="flex justify-center mt-8">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <section class="text-gray-600 body-font">
          <div class="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
            <img
              class="lg:w-3/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
              alt="hero"
              src={restaurant?.image?.url}
            />
            <div class="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
              <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                {restaurant?.restaurantName}
              </h1>
              {/* <h1 class="mb-8 font-semibold ">{restaurant?.address.}</h1> */}
              <div class="flex w-full justify-center items-end">
                {/* <div class="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
          <label for="hero-field" class="leading-7 text-sm text-gray-600">Placeholder</label>
          <input type="text" id="hero-field" name="hero-field" class="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        </div> */}
                <h2 className="text-indigo-500 font-serif font-semibold text-lg">
                  {restaurant?.description}
                </h2>
                {/* <h2 class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</h2> */}
              </div>
              <p class="text-lg mt-2 text-gray-900 mb-8 w-full">
                PHONE: {restaurant?.phone}
              </p>
              <div class="flex">
                <button class="bg-gray-100 border-2 border-black pl-3 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 512 512">
            <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
          </svg> */}
                  <span class="ml-4 flex items-start flex-col leading-none">
                    <span class="text-xs text-gray-600 mb-1">
                      Starting Time
                    </span>
                    <span class="title-font font-medium">
                      {restaurant?.startTime}
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
                      {restaurant?.endTime}
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default RestaurantCard;
