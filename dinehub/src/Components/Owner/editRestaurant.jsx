import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";

import { singleResDetails } from "../../helpers/ownerHelpers";
import { useNavigate, useParams } from "react-router-dom";

import { updateDetails } from "../../helpers/ownerHelpers";

function EditRestaurant() {
  const [resImage, setImage] = useState("");
  const [resName, setName] = useState("");
  const [resTime, setTime] = useState("");
  const [resTables, setTable] = useState("");
  const [resAddress, setAddress] = useState("");
  const [resPhone, setPhone] = useState("");
  const [resWifi, setWifi] = useState("");
  const [resParking, setParking] = useState("");
  const [resAircondition, setAirconditon] = useState("");

  const navigete = useNavigate();

  //to get each restaurant id
  const { id } = useParams();
  useEffect(() => {
    singleResDetails(id).then((data) => {
      const {
        address,
        image,
        phone,
        restaurantName,
        tables,
        time,
        wifi,
        parking,
        aircondition,
      } = data;

      setName(restaurantName);
      setImage(image);
      setAddress(address);
      setTable(tables);
      setTime(time);
      setPhone(phone);
      setWifi(wifi);
      setParking(parking);
      setAirconditon(aircondition);
    });
  }, [id]);

  const secureUrl = resImage ? resImage?.url : "";

  const handleResImage = (e) => {
    const file = e.target.files[0];
    TransformFile(file);
  };

  const TransformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  };

  const formik = useFormik({
    initialValues: {
      restaurantName: "",
      resAddress: "",
      resTables: "",
      resTime: "",
      resPhone: "",
      resImage: "",
      resWifi: "",
      resAircondition: "",
      resParking: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async () => {
      let img = { image: resImage };
      const datas = {
        resName,
        resAddress,
        resPhone,
        resTables,
        resTime,
        resWifi,
        resParking,
        resAircondition,
        id,
      };

      const allDetails = Object.assign({}, datas, img);

      const newDetails = await updateDetails(allDetails);

      if (newDetails) {
        navigete("/owner/restaurants");
      }
    },
  });

  return (
    <div className="p-10">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <form onSubmit={formik.handleSubmit} className="mx-auto max-w-lg">
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
          Restaurant Name
        </label>
        <input
          name="restaurantName"
          className="w-full border border-gray-400 p-2 rounded-md mb-4"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={resName}
          id="restaurantName"
        />

        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
          Address
        </label>
        <input
          name="address"
          className="w-full border border-gray-400 p-2 rounded-md mb-4"
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          value={resAddress}
          id="address"
        />
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
          Number Of Tables
        </label>
        <input
          name="tables"
          className="w-full border border-gray-400 p-2 rounded-md mb-4"
          type="number"
          onChange={(e) => setTable(e.target.value)}
          value={resTables}
          id="tables"
        />
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
          Working Hours
        </label>
        <input
          name="time"
          className="w-50 border border-gray-400 p-2 rounded-md mb-4"
          onChange={(e) => setTime(e.target.value)}
          value={resTime}
          type="text"
          id="time"
        />

        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
          Fecilities
        </h3>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center pl-3">
              <input
                name="wifi"
                id="vue-checkbox-list"
                onChange={(e) => setWifi(e.target.checked)}
                checked={resWifi}
                value={resWifi}
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="vue-checkbox-list"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Wifi
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center pl-3">
              <input
                name="parking"
                checked={resParking}
                onChange={(e) => setParking(e.target.checked)}
                value={formik.values.parking}
                id="react-checkbox-list"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="react-checkbox-list"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                parking
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center pl-3">
              <input
                name="aircondition"
                id="angular-checkbox-list"
                onChange={(e) => setAirconditon(e.target.checked)}
                value={resAircondition}
                type="checkbox"
                checked={resAircondition}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="angular-checkbox-list"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                AirConditioning
              </label>
            </div>
          </li>
        </ul>

        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
          Phone
        </label>
        <input
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
          value={resPhone}
          className="w-full border border-gray-400 p-2 rounded-md mb-4"
          type="text"
          id="phone"
        />

        <div className="py-5">
          <input
            onChange={handleResImage}
            id="file"
            name="image"
            type="file"
            className="file-input file-input-bordered file-input-accent w-full max-w-xs"
          />
          <p>err</p>

          <img
            className="py-4"
            width="200px"
            src={resImage?.url ? resImage?.url : secureUrl}
            height="200px"
            alt="ll"
          ></img>
        </div>

        <div className="space-x-5">
          <button
            className=" bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            type="submit"
          >
            Submit
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditRestaurant;
