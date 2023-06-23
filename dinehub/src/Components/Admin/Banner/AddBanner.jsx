import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { SetBanner } from "../../../helpers/adminHelpers";

import { useFormik } from "formik";
import { Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function AddBanner() {
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const Img = { image: image };

      const allData = Object.assign({}, values, Img);

      const details = SetBanner(allData);
      details.then((res) => {
        if (res) {
          navigate("/admin/restaurant/banner");
        }
      });
    },
  });

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

  return (
    <>
      <div className="bg-gray-200 border mt-10 border-gray-300 rounded-lg p-5">
        <div>
          <h2 className="font-serif font-bold">ADD BANNER</h2>
        </div>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          <div className="space-y-3">
            <Toaster position="top-center" reverseOrder={false} />

            <div>
              <label htmlFor="title" className="text-gray-700">
                Title
              </label>
              <Input
                name="title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
                className="w-full border-black rounded-lg"
              />
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
              <img
                className="w-auto"
                src={
                  image
                    ? image
                    : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                }
                alt="preview"
              />
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
    </>
  );
}

export default AddBanner;
