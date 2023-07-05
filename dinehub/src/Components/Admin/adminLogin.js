import { useFormik } from "formik";
import React from "react";

import { Auth } from "../../Api/axiosAuthinstance";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const result = await Auth.post("/admin/login", values);
        if (result?.data?.status) {
          toast.success(result.data.message)
            navigate('/admin')
        }
      }catch (error) {
        toast.error(error?.response?.data?.message)
      }
    },
  });
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-red-600 underline">
          ADMIN
        </h1>
        {/* <h1 className=" font-semibold text-center text-purple-700 underline">
                   Sign in
                </h1> */}
        <form onSubmit={formik.handleSubmit} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="block w-full px-4 py-2 mt-2 text-zinc-950 bg-white border rounded-md focus:border-black-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="block w-full px-4 py-2 mt-2 text-zinc-950 bg-white border rounded-md focus:border-black-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="/" className="text-xs text-red-600 hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-red-600"
            >
              Login
            </button>
          </div>
        </form>

        {/* <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="#"
                        className="font-medium text-red-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p> */}
      </div>
    </div>
  );
}
