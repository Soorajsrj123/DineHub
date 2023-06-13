import { Input } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import React, { useState } from "react";
import { DishValidation } from "../../ToastError/fomikValidation";
import { Toaster, toast } from "react-hot-toast";
import { AddDishes } from "../../helpers/ownerHelpers";
import { useNavigate } from "react-router-dom";

function AddDish() {
  const [image, setImage] = useState("");
  const data = useSelector((state) => state.owner.owner);
 
  const { owner } = data;
  const navigate = useNavigate();

  const validate = (values) => {
    return DishValidation(values);
  };

  const handleImage = (e) => {
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
      dishName: "",
      description: "",
      category: "",
      price: "",
      classification: "",
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const img = { image: image };
      const restaurantId = { owner: owner };
      const allData = Object.assign({}, values, img, restaurantId);

      const response = AddDishes(allData);

      toast.promise(response, {
        loading: "creating...",
        success: <b>added successfully</b>,
        error: <b>upload failed</b>,
      });

      response.then((data) => {
        if (data) {
          navigate("/owner/dishes");
        }
      });
    },
  });

  return (
    <div className="bg-gray-200 border border-gray-300 rounded-lg p-5">
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="space-y-3">
          <Toaster position="top-center" reverseOrder={false} />

          <div>
            <label htmlFor="dishName" className="text-gray-700">
              DISH NAME
            </label>
            <Input
              name="dishName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.dishName}
              placeholder="Dish Name"
              className="w-full border-black rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="description" className="text-gray-700">
              ITEM DESCRIPTION
            </label>
            <Input
              name="description"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.description}
              placeholder="Description"
              className="w-full border-black rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="category" className="text-gray-700">
              CATEGORY
            </label>
            <Input
              name="category"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.category}
              placeholder="Category"
              className="w-full border-black rounded-lg"
            />
          </div>

          <div className="space-x-3">
            <div>
              <label htmlFor="price" className="text-gray-700">
                PRICE
              </label>
              <Input
                name="price"
                type="number"
                placeholder="Price"
                value={formik.values.price}
                onChange={formik.handleChange}
                className="w-full border-black rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-evenly">
            <div>
              <label htmlFor="price" className="text-gray-700">
                VEG
              </label>
              <input
                name="classification"
                type="radio"
                checked={formik.values.classification === "veg"}
                value={"veg"}
                onChange={formik.handleChange}
                className="w-full border-black rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="price" className="text-gray-700">
                NON-VEG
              </label>
              <input
                name="classification"
                type="radio"
                checked={formik.values.classification === "non-veg"}
                value={"non-veg"}
                onChange={formik.handleChange}
                className="w-full border-black rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="image" className="text-gray-700">
              IMAGE
            </label>
            <input
              name="image"
              id="file"
              onChange={handleImage}
              type="file"
              className="mb-3"
            />
            {image && <img className="w-32" src={image} alt="preview" />}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 w-1/5 rounded-lg mt-8 py-2 text-white"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default AddDish;
