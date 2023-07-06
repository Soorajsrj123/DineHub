import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRestaurantDishes } from "../../helpers/userHelpers";
import { useDispatch, useSelector } from "react-redux";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import { setDishes } from "../../Slices/dishSlice";

import nonVegImg from "../../assets/icons8-non-veg-48.png";
import vegImg from "../../assets/icons8-veg-48.png";
import { Toaster, toast } from "react-hot-toast";
import RestaurantListPagination from "../Pagination/RestaurantListPagination";
function DishLists() {
  const [dishDatas, setDishDatas] = useState([]);
  const [postPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState(false);

  const dispatch = useDispatch();

  const { id } = useParams();
  const storedDishData = useSelector(
    (state) => state?.dishes?.dishes?.dishDetails
  );
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = dishDatas?.slice(firstPostIndex, lastPostIndex);
  // console.log(storedDishData,"st");
  useEffect(() => {
    if (storedDishData) {
      setDishDatas(storedDishData);
    } else {
      getRestaurantDishes(id)
        .then((data) => {
          const updatedDishData = data?.dishDetails?.map((item) => ({
            ...item,
            count: 0,
            total: 0,
          }));
          // fetch all dish of  restaurant
          // console.log(dishDatas,"called else");

          // Dispatching the details and storing the details in localstorage
          dispatch(
            setDishes({
              dishDetails: updatedDishData,
            })
          );
          setDishDatas(updatedDishData);
        })
        .catch((err) => {
          console.log(err, "err DishDetails");
          toast.error(err?.response?.data?.message);
        });
    }

    // console.log(owner,"owww");
  }, [id, storedDishData, dishDatas, selected, dispatch]);

  //   FUNCTION FOR HANDLING COUNT PLUS
  const handleIncrement = (dishId) => {
    // updated dishdata contains the updated dish state
    const updatedDishData = dishDatas.map((item) => {
      // checking the updated dish contains in state
      if (item?._id === dishId) {
        const updatedItem = {
          ...item,
          count: item?.count + 1,
          total: (item?.count + 1) * item?.price,
        };
        // updating new  value in redux and store in localstorage
        dispatch(
          setDishes({
            dishDetails: updatedItem,
          })
        );
        // new updated state
        return updatedItem;
      }
      //   if dish id not match with state dishes id then returning old details
      return item;
    });

    // UPDATING THE STATE WITH NEW UPDATED DATA
    setDishDatas(updatedDishData);
    setSelected(true);
    // STORING IN REDUX
    dispatch(
      setDishes({
        dishDetails: updatedDishData,
      })
    );
  };

  const handleDecrement = (dishId) => {
    // updated dishdata contains the updated dish state
    const updatedDishData = dishDatas?.map((item) => {
      // checking the updated dish contains in state
      if (item?._id === dishId) {
        const newCount = item?.count - 1;

        const updatedItem = {
          ...item,
          count: newCount >= 0 ? newCount : 0,
          total: (newCount >= 0 ? newCount : 0) * item?.price,
        };

        // updating new  value in redux and store in localstorage
        dispatch(
          setDishes({
            dishDetails: updatedItem,
          })
        );
        // new updated state
        return updatedItem;
      }
      //   if dish id not match with state dishes id then returning old details
      return item;
    });

    // UPDATING THE STATE WITH NEW UPDATED DATA
    setDishDatas(updatedDishData);

    // for showing the selected dish
    // STORING IN REDUX
    dispatch(
      setDishes({
        dishDetails: updatedDishData,
      })
    );
  };

  return (
    <>
      <div className="h-screen w-full flex bg-white-800">
        <main className="w-full overflow-y-auto">
          <div className="px-10 mt-5 mx-5 my-3">
            <span className="uppercase font-bold text-2xl text-black ">
              special food
            </span>
          </div>
          <Toaster position="top-center" reverseOrder={false}></Toaster>

          <div className="px-10 grid grid-cols-3 gap-4 ">
            {/* mapping dishes */}
            {currentPost.length ? (
              currentPost?.map((dish, index) => {
                return (
                  <div
                    key={index}
                    className="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center"
                  >
                    <div className="bg-white rounded-lg mt-5">
                      <img
                        src={dish?.image?.url}
                        className="h-40 w-60 object-cover rounded"
                        alt="dish"
                      />
                    </div>
                    <div className="bg-white shadow-lg rounded-lg -mt-4 w-64">
                      <div className="py-5 px-5">
                        <span className="font-bold text-gray-800 text-lg">
                          {dish?.dishName}
                        </span>
                        {dish?.classification === "non-veg" ? (
                          <img className="w-5" src={nonVegImg} alt="veg" />
                        ) : (
                          <img className="w-5" src={vegImg} alt="veg" />
                        )}
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600 font-light">
                            catagory : {dish?.category}
                          </div>
                          <div className="text-lg text-red-500 font-bold">
                            RS:{dish?.price}
                          </div>
                        </div>
                        <div className=" mt-4 flex ">
                          <div className="flex-none w-14 h-14 ...">
                            <button
                              onClick={() => {
                                handleDecrement(dish?._id);
                              }}
                              type="button"
                              className=" rounded-full bg-red-500 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="grow h-14 w-10 ...">
                            <input
                              type="text"
                              disabled
                              value={dish?.count}
                              className="border w-24 text-center
                                                   border-gray-300 rounded-full py-2 px-3 leading-3
                                                    text-gray-700 focus:outline-none focus:border-blue-500
                                                     focus:ring-blue-500 focus:ring-2 focus:ring-opacity-50"
                            />
                          </div>
                          <div className="flex-none w-14 h-14 ...">
                            <button
                              onClick={() => handleIncrement(dish?._id)}
                              type="button"
                              className="ms-2 rounded-full bg-red-500 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-red-700 font-serif text-center col-span-3">
                SORRY THIS PAGE IS'T AVAILABLE
              </h1>
            )}
          </div>
          <div className="m-5">
            <RestaurantListPagination
              currentPage={currentPage}
              totalPosts={dishDatas.length}
              postPerPage={postPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </main>

        <article className="rounded-lg border w-96 bg-gray-200  mt-10 me-6 p-4">
          {dishDatas?.map((dish) => {
            // console.log(dishDatas,"dish datas in map");
            return (
              <div
                key={dish?._id}
                className="flex items-center justify-between mt-5 "
              >
                {dish?.count ? (
                  <div>
                    <p className="text-xl text-gray-500">
                      {dish?.dishName?.toUpperCase()}
                    </p>
                    <p className="text-base text-black-400">
                      QTY:{dish?.count}
                    </p>
                    <p className="text-lg font-medium text-gray-900 mt-2">
                      Total : {dish?.total}
                    </p>
                  </div>
                ) : (
                  ""
                )}
                {dish?.count ? (
                  <span className="rounded-md p-4 text-blue-600">
                    <img
                      className="object-cover s rounded-lg w-24 h-24"
                      src={dish?.image?.url}
                      alt=""
                    />
                  </span>
                ) : (
                  ""
                )}
              </div>
            );
          })}

          <div className="text-center mt-5">
            {selected ? (
              <Link
                to={"/checkout"}
                type="button"
                className="w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Next
              </Link>
            ) : (
              // HEADER FOR NO DISH SELECTED
              <h1
                style={{
                  color: "#333",
                  fontFamily: "Arial, sans-serif",
                  textAlign: "center",
                  padding: "10px 0",
                  backgroundColor: "orange",
                  borderBottom: "1px solid #ccc",
                  marginBottom: "20px",
                }}
              >
                Select Your Dishes
              </h1>
            )}
          </div>
        </article>
      </div>
    </>
  );
}

export default DishLists;
