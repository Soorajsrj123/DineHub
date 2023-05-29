import React, { useState } from "react";
import { useFormik } from "formik";
import { RestaurantFormSchema } from "../../YupSchema/RestaurantSchema";
import { Toaster, toast } from "react-hot-toast";
import { RestaurantForm } from "../../helpers/ownerHelpers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Addrestaurant() {
  const [image, setImage] = useState("");
  const navigate=useNavigate()

  const data = useSelector((state) => state.owner);
  const { owner } = data;



  const handleImage = (e) => {
    const file = e.target.files[0];
 
    if (!file) {
      toast.error("please select a image");
    }
    TransformFile(file);
  };
  const TransformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      // the readAsDataURL return a url
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  };

  let formik = useFormik({
    initialValues: {
      restaurantName: "",
      address: "",
      tables: "",
      time: "",
      wifi: false,
      parking: false,
      aircondition: false,
      phone: "",
    },
    validationSchema: RestaurantFormSchema,

    onSubmit: async (values) => {
      let img = { image: image };
  
   
      // ASSIGNING IMAGE VALUE TO THE FORMIK VALUES
      const imgcopy = Object.assign({}, values, img);

      const details = RestaurantForm(imgcopy,owner);

      details
        .then((data) => {
         
          navigate('/owner/restaurants')

        })
        .catch((error) => {
          toast.error(error.name);
         
        });
    },
  });

  return (
    <div className="p-10">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <form className="mx-auto max-w-lg" onSubmit={formik.handleSubmit}>
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
          Restaurant Name
        </label>
        <input
          name="restaurantName"
          value={formik.values.restaurantName}
          onChange={formik.handleChange}
          className="w-full border border-gray-400 p-2 rounded-md mb-3"
          type="text"
          id="restaurantName"
        />
        <p className="text-red-600 mb-3">{formik.errors.restaurantName}</p>
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
          Address
        </label>
        <input
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          className="w-full border border-gray-400 p-2 rounded-md mb-4"
          type="text"
          id="address"
        />
        <p className="text-red-600 mb-3">{formik.errors.address}</p>

        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
          Number Of Tables
        </label>
        <input
          name="tables"
          value={formik.values.tables}
          onChange={formik.handleChange}
          min="1"
          className="w-full border border-gray-400 p-2 rounded-md mb-4"
          type="number"
          id="tables"
        />
        <p className="text-red-600 mb-3">{formik.errors.tables}</p>

        <div>
          <label
            className="block font-medium text-gray-700 mb-2"
            htmlFor="Working hour"
          >
            Working Hour
          </label>
          <input
            className=" w-60 border border-gray-400 rounded-md mb-3 p-2"
            type="text"
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            id="time"
          />
          <p className="text-red-600 mb-3">{formik.errors.time}</p>
        </div>

        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
        facilities
        </h3>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center pl-3">
              <input
                name="wifi"
                value={formik.values.wifi}
                onChange={formik.handleChange}
                id="vue-checkbox-list"
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
                value={formik.values.parking}
                onChange={formik.handleChange}
                id="react-checkbox-list"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="react-checkbox-list"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Parking
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center pl-3">
              <input
                name="aircondition"
                value={formik.values.aircondition}
                onChange={formik.handleChange}
                id="angular-checkbox-list"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="angular-checkbox-list"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Air Conditioner
              </label>
            </div>
          </li>
        </ul>

        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
          Phone
        </label>
        <input
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          className="w-full border border-gray-400 p-2 rounded-md mb-4"
          type="text"
          id="phone"
        />
        <p className="text-red-600 mb-3">{formik.errors.phone}</p>

        <div className="py-5">
          <input
            id="file"
            name="image"
            onChange={handleImage}
            type="file"
            className="file-input file-input-bordered file-input-accent w-full max-w-xs"
          />
          <img src={image} alt="Preview" className="w-48" />
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

export default Addrestaurant;
