import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isExistingNumber } from "../../../helpers/userHelpers";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../Config/config";
import {getUserData} from '../../../helpers/userHelpers'
function OTPInputComponent() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();
  const [myotp, setMyOtp] = useState("");

  const [confirmObj, setConfirmObj] = useState(""); //user for saving the response from firebase
  const [flag, setFlag] = useState(false); //to switch the phone and otp pages

  const onCaptchaVerify = (phoneNumber) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  };

  const userId = useSelector((state) => state.user.user);
  const { user } = userId;
  const getOtp = async (e) => {
    e.preventDefault();

    try {
      const extractedNumber = phoneNumber.slice(3);
      //    phoneNumber validation
      if (
        extractedNumber.length === 0 ||
        extractedNumber.length < 10 ||
        extractedNumber.length > 10
      ) {
        toast.error("enter a valid phone number");
        return;
      } else {
        //checking phone No is registered or not
        const valid = await isExistingNumber(extractedNumber, user);

        if (valid.status) {
          //response from firebase
          const response = await onCaptchaVerify(phoneNumber);

          setConfirmObj(response);
          setFlag(true); // Show the second form
        } else {
          toast.error(valid.message);
        }
      }
    } catch (error) {
      // User signup failed
      console.log(error, "kjhg");

      //   error for invalid otp
      if (error.code === "auth/invalid-verification-code") {
        toast.error("Incorrect OTP");
      } else if (error.code === "auth/session-expired") {
        // error for time out
        console.log("time expired");
      } else {
        // other errors
        toast.error(
          "The verification code has expired. Please request a new code"
        );
      }
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      if (!myotp) {
        toast.error(" OTP Number Required");
        return;
      } else {
        //confirm function verify the OTP
        await confirmObj.confirm(myotp).then((result) => {
          // User signed in successfully.
          // const user = result.user; //the user variable contains some data
          // console.log(user.phoneNumber,"firebase response");
           
          const details= getUserData(phoneNumber)
          details.then(async(data)=>{
      console.log(data.userId,">>>>>>>id");
       await navigate(`/forgot-password/${data.userId}`);
          })
        });
      }
    } catch (error) {
      console.log(error,"cccc");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <form
          onSubmit={getOtp}
          style={{ display: !flag ? "block" : "none" }}
          className="w-64"
        >
          <div id="recaptcha-container"></div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label>
            <PhoneInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              defaultCountry="IN"
              placeholder="Enter phone number"
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

        <form
          onSubmit={verifyOtp}
          style={{ display: flag ? "block" : "none" }}
          className="w-64"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              OTP
            </label>
            <input
              type="text"
              value={myotp}
              onChange={(e) => setMyOtp(e.target.value)}
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
    </div>
  );
}

export default OTPInputComponent;