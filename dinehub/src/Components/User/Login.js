import { useFormik } from "formik";
import { UserLogin } from "../../helpers/userHelpers";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../Slices/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Config/config";
import { loginGoogle } from "../../helpers/userHelpers";
import {FcPhoneAndroid} from 'react-icons/fc'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(true);

    const togglePasswordVisibility = () => {
  
      setPasswordVisible(!passwordVisible);
    };

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user.user;
  });

  const googleLogin = async () => {
    let firebasedata = await signInWithPopup(auth, provider);
    loginGoogle(firebasedata)
      .then((data) => {
        if (data) {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const Loginuser = UserLogin(values);
      console.log(Loginuser, "axois res");

      toast.promise(Loginuser, {
        loading: "Please Wait",
        success: "logined",
        error: <p>Login Failed</p>,
      });
      Loginuser.then((data) => {
        if (data) {
          // storing token in localstorage
          localStorage.setItem('token',data.data.token)
          const userId=data.data.user._id
          dispatch(
            logIn({
              user: userId,
            })
          );
          navigate("/home");
        }
      }).catch((error) => {
        console.log(error.response.data, "catch ");
        toast.error(error.response.data);
      });
    },
  });
  console.log(user);
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
         User Sign in
        </h1>
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
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.email}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2 relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              name="password"
              type={passwordVisible ? "text" : "password"}
              id="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.password}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <span className="absolute inset-y-0 right-0 pr-3 pt-7 flex items-center text-sm leading-5">
              {passwordVisible ? (
                <FaEyeSlash
                  onClick={togglePasswordVisibility}
                  className="text-gray-500  cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={togglePasswordVisibility}
                  className="text-gray-500 cursor-pointer"
                />
              )}
            </span>
          </div>
        <Link to='/otp/forgot-password' >  <span className="text-xs text-purple-600 hover:underline">
            Forget Password?
          </span>
          </Link>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
        </form>
        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white">Or</div>
        </div>
        <div className="flex mt-4 gap-x-2">
          <button
            onClick={googleLogin}
            type="button"
            className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>
          <Link to='/otp' className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
       
           <FcPhoneAndroid  />

          </Link>
       <button  className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
            </svg>
          </button>
        
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
