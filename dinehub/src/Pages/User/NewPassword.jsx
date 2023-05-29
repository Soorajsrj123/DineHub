import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useFormik} from 'formik'
import {updatePassword} from '.././../helpers/userHelpers'

function NewPasswordPage() {

    // for SHOW/HIDE PASSWORD
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
  const [confirmPassword,setConfirmPassword]=useState('')
  const navigate=useNavigate()
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const validate=(values)=>{
    console.log(values,"kk");
    let errors={}
    if(!values.password) errors.password=toast.error('Please enter a password to proceed')
    else if(values.password.length<6) errors.password=toast.error('Password must be atleast 6 characters')
    else if(!confirmPassword)errors.confirmPassword=toast.error('Confirm Password Required')
    else if(values.password!==confirmPassword)errors.confirmPassword=toast.error("Passwords not match")
    return errors
  }


    const userId=useParams()


     const formik=useFormik({
        initialValues:{
            password:"",
        },
      validate,
      validateOnChange:false,
      validateOnBlur:false,
      onSubmit:(values)=>{
           
        try {
            const id=userId
            const allData=Object.assign({},values,id)

            const details=updatePassword(allData)
            toast.promise(details,{
                loading:"proccessing",
                success:"password updated successfully",
                error:"password not updated"
            })
            details.then((data)=>{
         if(data){
            navigate('/login')
         }
            })


        } catch (error) {
            
        }

      }
      
     })




  return (
    <div>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="w-full p-6  m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          <h5 className="text-2xl font-semibold text-center text-gray-700 uppercase">
            Enter Your New Password
          </h5>
          <form  onSubmit={formik.handleSubmit} className="mt-6">
            <div className="mb-2 relative">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                 Password
              </label>
              <input
                name="password"
                type={confirmPasswordVisible ? "text" : "password"}
                id="password"
                
                  onChange={formik.handleChange}
                  value={formik.password}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <span className="absolute inset-y-0 right-0 pr-3 pt-7 flex items-center text-sm leading-5">
                {confirmPasswordVisible ? (
                  <FaEyeSlash
                    onClick={toggleConfirmPasswordVisibility}
                    className="text-gray-500  cursor-pointer"
                  />
                ) : (
                  <FaEye
                    onClick={toggleConfirmPasswordVisibility}
                    className="text-gray-500 cursor-pointer"
                  />
                )}
              </span>
            </div>
            <div className="mt-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Confirm Password
              </label>
              <input
                name="password"
                type={passwordVisible ? "text" : "password"}
                id="password"
               
                  onChange={(e)=>setConfirmPassword(e.target.value)}
             
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

            <div className="flex justify-center ">
              <div className="mt-6 mr-5 ">
                <button
                  type="submit"
                  className="w-32 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-purple-600"
                >
                  Confirm
                </button>
              </div>
              <div className="mt-6">
                <Link to="/login">
                  {" "}
                  <button
                    type="submit"
                    className="w-32 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-400 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPasswordPage;
