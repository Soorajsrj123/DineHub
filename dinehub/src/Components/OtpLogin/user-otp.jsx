import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { auth } from "../../Config/config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
const OtpLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [myotp, setMyOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState("");

  const onCaptchaVerify = (phoneNumber) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  };

  const getOtp = async () => {
    try {
      const response = await onCaptchaVerify(phoneNumber);

      setConfirmObj(response);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const verifyOtp = async () => {
    console.log(confirmObj);
    try {
      await confirmObj?.confirm(myotp).then((result) => {
        // User signed in successfully.
        // const user = result.user; the user variable conatailn some data
        navigate("/");
      });
    } catch (error) {
      // user signup failed
      console.log(error, "kjhg");
      if (error.code === "auth/invalid-verification-code") {
        // Handle invalid verification code error
        toast.error("incorrect otp");
        setError("INCORRECT  OTP");
      } else if (error.code === "auth/session-expired") {
        // Handle session expired error
        setError("opt expired");
        // Display an error message to the user or perform any necessary actions
      } else {
        toast.error("incorrect otp");

        setTimeout(() => {
          setError(false);
        }, 5000);

        // Handle other errors
        // Display a generic error message to the user or perform any necessary actions
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-xl font-bold mb-4">OTP Login</h2>
        <form>
          <div className="mb-4">
            <div id="recaptcha-container"></div>
            <label htmlFor="phone" className="block font-medium mb-1">
              Phone Number
            </label>
            <PhoneInput
              // id="phone"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              defaultCountry="IN"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="otp" className="block font-medium mb-1">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              autoComplete="off"
              value={myotp}
              onChange={(e) => setMyOtp(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="button"
            onClick={getOtp}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <button
            className="bg-green-500 mx-6 w-28"
            type="button"
            onClick={verifyOtp}
          >
            submit otp
          </button>
        </form>
      </div>
      <div className="flex">
        {error && <p className="text-red-700">{error}</p>}
      </div>
    </div>
  );
};

export default OtpLogin;
