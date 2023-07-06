import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { getRestaurants } from "../../helpers/commonHelper";
import UserListPagination from "../Pagination/AdminSidePagination";
function RestaurantLists() {
  const [reconrds, setRecords] = useState([]);

  useEffect(() => {
    const response = getRestaurants();
    response
      .then((data) => {
        if (data?.status) {
          setRecords(data.Details);
        }
      })
      .catch((err) => {
        console.log(err, "err");
        toast.error(err);
      });
  }, []);

  const [curretPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(1);

  const lastPostIndex = curretPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = reconrds?.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-center md:flex">
        <h1 className="text-gray-800 font-serif">RESTAURANTS LIST</h1>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Username</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">fssc</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {currentPost?.map((res, index) => {
              return (
                <tr key={index}>
                  <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={res?.image?.url}
                      alt="restaurant"
                    />
                    <div>
                      <span className="block text-gray-700 text-sm font-medium">
                        {res?.restaurantName}
                      </span>
                      {/* <span className="block text-gray-700 text-xs">{res.email}ijuh</span> */}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{res?.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{res?.fssc}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {" "}
                    <span
                      className={`px-3 py-2 rounded-full font-semibold text-xs ${
                        res?.status === "pending"
                          ? "text-yellow-600 bg-yellow-100"
                          : res?.status === "approved"
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100"
                      }`}
                    >
                      {res?.status === "approved"
                        ? "Active"
                        : res?.status === "pending"
                        ? "pending"
                        : "Rejected"}
                    </span>
                  </td>
                  <td className="text-right px-6 whitespace-nowrap">
                    <Link to={`/admin/restaurant/view-restaurant/${res?._id}`}>
                      <button
                        href=""
                        className="py-2 leading-none px-3 bg-green-200 font-medium text-green-600 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        View-Details
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <UserListPagination
        curretPage={curretPage}
        totalPosts={reconrds?.length}
        postsPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default RestaurantLists;
