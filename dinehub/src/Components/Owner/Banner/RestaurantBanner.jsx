import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRestaurantBanners } from "../../../helpers/ownerHelpers";
import { deleteRestaurantBanner } from "../../../helpers/ownerHelpers";
import { useSelector } from "react-redux";
import { ToastBar, Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";

function RestaurantBanner() {
  const restaurantId = useSelector((state) => state?.owner?.owner);

  const { owner } = restaurantId;

  const [banners, setBanner] = useState("");

  useEffect(() => {
    getAllRestaurantBanners(owner).then((res) => {
      if (res) {
        setBanner(res?.result);
      }
    });
  }, []);

  const handleDelete = (bannerId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result?.isConfirmed) {
        deleteRestaurantBanner(bannerId).then((res) => {
          if (res) {
            setBanner(res?.allbanner);
          }
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="flex">
          <Link
            to="/owner/add-restaurant-banner"
            className="bg-blue-500 text-white p-3 rounded-lg lg:w-auto m-5 hover:bg-blue-950 "
          >
            ADD BANNER
          </Link>
        </div>
        <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
          <Toaster position="top-center" />
          <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {banners ? (
              <article
                className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
                key={banners?._id}
              >
                <img
                  src={banners?.imageURL ? banners?.imageURL : ""}
                  loading="lazy"
                  alt={banners?.title}
                  className="w-full h-48 rounded-t-md"
                />
                <div className="flex items-center mt-2 pt-3 ml-4 mr-2"></div>
                <div className="pt-3 ml-4 mr-2 mb-3">
                  <h3 className="text-xl text-gray-900">{banners?.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {banners?.subTitle}
                  </p>
                </div>

                {/* <button
                  className="bg-red-600 px-4 py-2 mb-3 text-white font-sans rounded-lg   "
                  onClick={() => handleDelete(banners._id)}
                >
                  DELETE
                </button> */}
                <button
                  onClick={() => handleDelete(banners?._id)}
                  class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </article>
            ) : (
              ""
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default RestaurantBanner;
