import React from "react";
import {useFormik} from 'formik'
import toast,{Toaster} from 'react-hot-toast'
import {UserRegistration} from '../../helpers/userHelpers'
import {useNavigate} from 'react-router-dom'
import { auth,provider } from "../../Config/config";
import {signInWithPopup} from 'firebase/auth'
import { SigninGoogle } from "../../helpers/userHelpers";

export default function SignUp() {

  const googleSignin=async()=>{
         let firebasedata=await  signInWithPopup(auth,provider)
       
         SigninGoogle( firebasedata).then((res)=>{
        
          if(res)
          {
            navigate('/home')
          }
         }).catch((err)=>{
          toast.error(err.response.data)
          // console.log(err,"axios res");
         })
  }


  let navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      name:'',
      email: '',
      PhoneNumber:'',
      password:''

    },
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async (values) => {
    
      const registerdetails=  UserRegistration(values)
  
       
      toast.promise(registerdetails,{
        loading:"creating...",
        success:<b>sign up successfully</b>,
        error: <b>Can't sign up user</b>
      })
     registerdetails.then((data)=>{
      if(data)
      {
        navigate('/login')
      }
     }).catch((error)=>{
      toast.error(error.response.data.err)
      console.log(error);
     })
           
    },
  })
    return (
        <section>
  <div className="grid grid-cols-1 lg:grid-cols-2">
  <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div
      className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h2
          className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
          Sign Up
        </h2>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
          Already have an account?
          <a
            href="/login"
            title=""
            className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700">
            Sign In
          </a>
        </p>
        <form onSubmit={formik.handleSubmit} className="mt-8">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="text-base font-medium text-gray-900 dark:text-gray-200">
                Full Name
              </label>
              <div className="mt-2.5">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  placeholder="Enter You Full Name"
                  id="name" />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-900 dark:text-gray-200">
                Email address
              </label>
              <div className="mt-2.5">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                  type="email"
                  name='email'
                  onChange={formik.handleChange}
                  value={formik.values.email}

                  placeholder="Enter Your Email"
                  id="email" />
              </div>
            </div>
            <div>
              <label
                htmlFor="PhoneNumber"
                className="text-base font-medium text-gray-900 dark:text-gray-200">
                PhoneNumber
              </label>
              <div className="mt-2.5">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                  type="number"
                  name='PhoneNumber'
                  onChange={formik.handleChange}
                  value={formik.values.PhoneNumber}

                  placeholder="Enter Your PhoneNumber"
                  id="PhoneNumber" />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-base font-medium text-gray-900 dark:text-gray-200">
                Password
              </label>
              <div className="mt-2.5">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="Enter Your Password"
                  id="password" />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">
                Get started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="ml-2 h-4 w-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
                </svg>
              </button>
            </div>
          </div>
        </form>
        <div className="mt-3 space-y-3">
          <button
           onClick={googleSignin}
            type="button"
            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-500 bg-white px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none dark:text-gray-400">
            <div className="absolute inset-y-0 left-0 p-4">
              <svg
                className="h-6 w-6 text-rose-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path
                  d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
              </svg>
            </div>
            Sign up with Google
          </button>
          {/* <button
            type="button"
            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-500 bg-white px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none dark:text-gray-400">
            <div className="absolute inset-y-0 left-0 p-4">
              <svg
                className="h-6 w-6 text-[#2563EB]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path
                  d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
              </svg>
            </div>
            Sign up with Facebook
          </button> */}
          <p>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Read our
              <span className="capitalize text-indigo-600">privacy policy</span>
              and
              <span className="capitalize text-indigo-600">terms of service</span>
              to learn more
            </span>
          </p>
        </div>
      </div>
    </div>
    <div className="h-full w-full">
      <img
        className="mx-auto h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1742&amp;q=80"
        alt="" />
    </div>
  </div>
</section>

    );
}