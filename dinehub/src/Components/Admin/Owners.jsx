import React, { useState } from "react";

import { getAllOwners } from "../../helpers/adminHelpers";
import { UnBlockOwner } from "../../helpers/adminHelpers";
import { BlockOwner } from "../../helpers/adminHelpers";
import OwnerListPagination from "../Pagination/AdminSidePagination";
import { useEffect } from "react";

const TableTwo = () => {
  const [allOwnersData, setAllOwners] = useState([]);

  // UNBLOCK OWNER
  const handleUnBlock = (ownerId) => {
    const response = UnBlockOwner(ownerId);

    response.then((updatedData) => {
      setAllOwners(updatedData.data);
    });
  };

  // BLOCK OWNER
  const handleBlock = (ownerId) => {
    const response = BlockOwner(ownerId);

    response.then((updatedata) => {
      setAllOwners(updatedata.data);
    });
  };

  useEffect(() => {
    const OwnersData = getAllOwners();
    OwnersData.then((data) => {
      if (data) {
        setAllOwners(data.AllOwners);
      }
    });
  }, []);

  // PAGINATION
  const [curretPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(2);

  const lastPostIndex = curretPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = allOwnersData?.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            OWNERS LISTS
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t py-3 bg-slate-300 border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Owner Name</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Email ID</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Phone No</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Restaurant Name</p>
          </div>
          <div className="col-span-1 px-10 flex items-center">
            <button className="font-medium">Activity</button>
          </div>
        </div>

        {currentPost?.map((owner, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            >
              <div className="col-span-3 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-12.5 w-15 rounded-md">
                    <img
                      className="w-8 "
                      src="https://cdn-icons-png.flaticon.com/512/17/17004.png"
                      alt="Product"
                    />
                  </div>
                  <p className="text-sm text-black dark:text-white">
                    {owner?.RestaurantName}
                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {owner?.email}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {owner?.phone}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {owner?.owner}
                </p>
              </div>
              <div className="col-span-1 my-5 flex px-10 items-center">
                {owner?.isBlocked ? (
                  <button
                    onClick={() => handleUnBlock(owner?._id)}
                    className="rounded-md bg-red-600 px-3 py-1.5 text-base font-semibold leading-7 text-white hover:bg-red-500 "
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlock(owner?._id)}
                    className="rounded-md bg-green-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-green-500 "
                  >
                    Block
                  </button>
                )}
              </div>

              {/* PAGINATION */}
            </div>
          );
        })}
      </div>
      <div>
        <OwnerListPagination
          curretPage={curretPage}
          totalPosts={allOwnersData?.length}
          postsPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default TableTwo;
