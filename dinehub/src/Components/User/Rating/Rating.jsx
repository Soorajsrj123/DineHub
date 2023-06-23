import React, { useEffect, useId, useState } from "react";
import "./Rating.css";
import { useFormik } from "formik";
import { AddRating } from "../../../helpers/userHelpers";
import { useSelector } from "react-redux";
import { getUserReview } from "../../../helpers/ownerHelpers";

import { deleteUserReview } from "../../../helpers/userHelpers";
const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState(true);
  const [userReview, setUserReview] = useState("");
  const userData = useSelector((state) => state.user.user);

  const restaurantId = useSelector(
    (state) => state.dishes.dishes.dishDetails[0].restaurantId
  );

  const { user } = userData;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const formik = useFormik({
    initialValues: {
      review: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const star = { rating: rating };
      const userId = { user: user };
      const resId = { restaurantId: restaurantId };
      const allData = Object.assign({}, values, star, userId, resId);
      console.log(allData, "all data");
      const ratingResponse = AddRating(allData);
      ratingResponse.then((res) => {
        if (res) {
          setStatus(false);
        }
      });
    },
  });

  const handleStarClick = (starValue) => {
    console.log(starValue);
    setRating(starValue);
  };

  const handleReviewDelete = (reviewId) => {
    deleteUserReview(reviewId).then((res) => {
      if (res) {
        // console.log(res.updatedData, "the deleted final");
        setStatus(false);
        setUserReview("");
      }
    });
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? "filled" : ""}`}
          onClick={() => handleStarClick(i)}
        >
          &#9734;
        </span>
      );
    }

    return stars;
  };

  useEffect(() => {
    getUserReview(restaurantId, user)
      .then((res) => {
        console.log(res, "final mmmm");
        setUserReview(res.review);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [status,userReview]);
  console.log(!userReview, "final last rating");
  return (
    <>
      {!userReview&&status ? (
        <div className="flex flex-col items-center">
          <p>Rate:</p>
          <div className="star-rating">{renderStars()}</div>
          <form
            className="flex flex-col items-center"
            onSubmit={formik.handleSubmit}
          >
            <textarea
              className=" h-28 w-80 border-2 border-black "
              name="review"
              placeholder="Write a review..."
              value={formik.values.review}
              onChange={formik.handleChange}
            />
            <button
              type="submit"
              className="bg-blue-600 w-48 py-3 text-xl font-serif font-medium text-white mt-3 "
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="xl:w-5/12 w-11/12 mx-auto mb-4 my-6 md:w-2/3 shadow sm:px-10 px-4 py-6 bg-white dark:bg-gray-800 rounded-md">
          <p className="text-lg text-gray-800 dark:text-gray-100 font-semibold mb-4">
            Your Review
          </p>
          <div className="flex bg-indigo-700 rounded-md relative">
            <div className="flex">
              <div className="px-4 py-6 border-r border-indigo-600">
                <div className="h-10 w-10">
                  <img
                    src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=80"
                    alt="review"
                    className="h-full w-full rounded-full overflow-hidden shadow object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center pl-3 py-2 sm:py-0">
                <p className="text-sm font-bold text-white pb-1">{}</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                  <b>
                    {" "}
                    <p className="text-xm text-slate-300 leading-5">
                      {userReview.userName} :{" "}
                    </p>
                  </b>
                  <p className="text-xs text-white mt-1 ml-2 leading-5">
                    {userReview.review}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 m-auto mt-2 sm:mt-4 mr-2 sm:mr-4 sm:right-0 w-5 text-white cursor-pointer">
              <div className="relative inline-block text-left ">
                <button
                  type="button"
                  className="inline-flex justify-center w-full  rounded-md border border-gray-300 shadow-sm px-2 py-1  bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 "
                  onClick={handleDropdownToggle}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-edit"
                    width={20}
                    height={22}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                    <line x1={16} y1={5} x2={19} y2={8} />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="none">
                      <button
                        className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        // onClick={handleEdit}
                      >
                        Edit
                      </button>
                      <button
                        className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => handleReviewDelete(userReview._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StarRating;
