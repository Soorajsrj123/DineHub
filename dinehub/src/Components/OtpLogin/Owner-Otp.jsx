import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

function OwnerOtp() {

 

    useEffect(()=>{
     
        

    },[])
 

  return (
    <>
     <div className="flex justify-center items-center h-screen">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
<form
        // onSubmit={verifyOtp}
   
        className="w-64"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            OTP
          </label>
          <input
            type="text"
        
          
            placeholder="Enter OTP"
            className="w-full px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm border border-gray-300 outline-none focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            Submit
          </button>
        </div>
      </form>
      </div>
    </>
  )
}

export default OwnerOtp