import axios from "axios";
import { Auth } from "./axiosAuthinstance";
// Add a request interceptor
Auth.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log("req sent");

    console.log(config, "req");
    const token = localStorage.getItem("token");
    console.log(token, "tooooooooooooooooken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error.config);
    return Promise.reject(error);
  }
);

// Add a response interceptor
Auth.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response) {
      // The request was made and the server responded with a non-2xx status code
      console.log(error.response.status);

      console.log(error.response.data);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made, but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.log("Error", error.message);
    }
    console.log(error.config); // Access the request details here
    return Promise.reject(error);
  }
);

export default Auth;
