import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../helpers/adminHelpers";
import UserListPagination from '../Pagination/AdminSidePagination'

function UserList() {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers();
      if (data?.status) {
        setUsers(data?.AllUsers);
      }
    };
    fetchData();
  }, []);


  const [curretPage,setCurrentPage]=useState(1)
     const [postPerPage,setPostPerPage]=useState(1)
   

     const lastPostIndex=curretPage*postPerPage
     const firstPostIndex=lastPostIndex-postPerPage
     const currentPost=Users?.slice(firstPostIndex,lastPostIndex)

  return (
    <div className="rounded-sm border border-gray-400 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className=" py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          USERS LIST
        </h4>
      </div>

      <div className="bg-slate-200 grid grid-cols-6 border-y border-gray-400 py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 px-10 flex items-center">
          <p className="font-medium">user Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Email Id</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Phone</p>
        </div>
        <div className="col-span-1 flex items-center">
          {/* <p className="font-medium">Restaurant Name</p> */}
        </div>
        <div className="col-span-1 flex items-center">
          <button className="font-medium">Status</button>
        </div>
      </div>
      {currentPost?.map((user, index) => {
        return (
          <div
            key={index}
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          >
            <div className="col-span-3 flex items-center">
              <div className="flex flex-col px-7 gap-4 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md">
                  <img
                    className="w-8 "
                    src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-File.png"
                    alt="Product"
                  />
                </div>
                <p className="text-sm text-black dark:text-white">
                  {user?.name}
                </p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">{user?.email}</p>
            </div>
            <div className="col-span-1 flex items-center">
              {user?.PhoneNumber ? (
                <p className="text-sm text-black dark:text-white">
                  {user?.PhoneNumber}
                </p>
              ) : (
                <p className="text-red-500">Not Available</p>
              )}
            </div>
            <div className="col-span-1 flex items-center">
              {/* <p className='text-sm text-black dark:text-white'>name</p> */}
            </div>
            <div className="col-span-1 my-5 flex items-center">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        );
      })}
      <UserListPagination  curretPage={curretPage}  totalPosts={Users?.length}  postsPerPage={postPerPage} setCurrentPage={setCurrentPage}   />
    </div>
  );
}

export default UserList;
