import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userOrderDetails } from "../../../helpers/ownerHelpers";
function UserOrders() {
  const [orders, setOrders] = useState([]);
  const navigate=useNavigate()
  const { owner } = useSelector((state) => state?.owner?.owner);

  useEffect(() => {
    const details = userOrderDetails(owner);
    details
      .then((res) => {
        if (res) {
          setOrders(res?.allOrders);
        }
      })
      .catch((err) => {
        console.log(err, "error in User Orders detaisl");
        if(err.response.status===401){
          navigate('/owner/login')
        }
      });
  }, [owner,navigate]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-center md:flex">
        <h1 className="text-gray-800 font-serif">RESTAURANTS LIST</h1>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">UserId</th>
              <th className="py-3 px-6">OrderId</th>
              <th className="py-3 px-6">Booked Time</th>
              <th className="py-3 px-6">date of booking</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {orders?.map((order, index) => {
              return (
                <tr key={index}>
                  <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    {/* <img
                        className="w-10 h-10 rounded-full"
                        // src={res?.image?.url}
                        alt="restaurant"
                      /> */}
                    <div>
                      <span className="block text-gray-700 text-sm font-medium">
                        {order?.userId}
                      </span>
                      {/* <span className="block text-gray-700 text-xs">{res.email}ijuh</span> */}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{order?._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order?.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {" "}
                    <span
                      className={`px-3 py-2 rounded-full font-semibold text-xs ${"text-black bg-yellow-100"}`}
                    >
                      {order?.date}
                    </span>
                  </td>
                  <td className="text-right px-6 whitespace-nowrap">
                    <Link to={`/owner/user-order/view-details`}>
                      <button className="py-2 leading-none px-3 bg-green-200 font-medium text-green-600 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg">
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
      {/* <UserListPagination  curretPage={curretPage}  totalPosts={reconrds.length}  postsPerPage={postPerPage} setCurrentPage={setCurrentPage}      /> */}
    </div>
  );
}

export default UserOrders;
