import React from 'react'
import { Link } from 'react-router-dom'

function RegistrationSuccess() {
  
  return (
  <>
 <div className="min-h-screen  bg-gradient-to-r from-purple-500 to-green-400 animate-gradient">
      
      <div className="flex flex-col  justify-center items-center">
        <div className="max-w-md  mt-48 mx-auto bg-white rounded p-8 shadow-md ">
          <h2 className="text-2xl font-bold mb-4">Thank You for Registering!</h2>
          <p className="text-gray-700">Your restaurant registration has been submitted successfully. Our team will review your application, and you will receive an email notification once your registration is approved</p>
       <Link to='/owner/login' >   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">
            LogIn
          </button>
          </Link>
        </div>
      </div>
    </div>
  </>
  )
}

export default RegistrationSuccess