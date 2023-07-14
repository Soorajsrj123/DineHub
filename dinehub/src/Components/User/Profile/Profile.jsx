import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserDetailsById } from "../../../helpers/commonHelper";

function Profile() {
  const [records, setRecords] = useState("");
  const userId = useParams();
  const { id } = userId;
  useEffect(() => {
    getUserDetailsById(id).then((res) => {
      if (res) {
        setRecords(res?.details);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 const walletAmmount=records?.wallet?.reduce((acc, obj) => acc + obj,0)
  return (
    <div className="flex flex-col justify-center items-center mt-48">
      <div className=" bg-white shadow-lg  rounded-2xl w-80 dark:bg-gray-800  ">
        <img
          alt="profil"
          src={
            records?.imageURL?.url
              ? records?.imageURL?.url
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
          }
          className="w-80  object-fill mb-4 rounded-t-lg h-56"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="/" className="relative block">
            <img
              alt="profil"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoq0f1tSU2b8opZaApGh5tl2FreFb52dyo6Q&usqp=CAU"
              className="mx-auto object-cover rounded-full h-16 w-16  border-2 border-white dark:border-gray-800"
            />
          </a>
          <p className="mt-2 text-xl font-medium text-gray-800 dark:text-white">
            {records?.name}
          </p>
          <p className="mb-4 text-xs text-gray-60000">{records?.email}</p>
          <p className="mb-4 text-lg  text-gray-95000">{records?.PhoneNumber}</p>
          <Link
            to={`/edit-profile/${records?._id}`}
            className="p-2 px-4 text-xs text-white bg-pink-500 rounded-full"
          >
            Edit Profile
          </Link>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-200">
              <p className="flex flex-col">
                No of Orders
                <span className="font-bold text-black dark:text-white">3</span>
              </p>
              <p className="flex flex-col">
                My Wallet
                <span className="font-bold text-black dark:text-white">
                  {walletAmmount??0}
                </span>
              </p>
              <p className="flex flex-col">
                Rating
                <span className="font-bold text-black dark:text-white">9.3</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
