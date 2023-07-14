// import { axios_instance } from "./axiosAuthinstance";
import axios from "axios";

// admin base url
export const baseUrl = axios.create({
  baseURL: "https://server.sooraj.site",
  withCredentials:true
})

 export const owner_Interceptor=axios.create({
  baseURL:"https://server.sooraj.site",
  withCredentials:true
})

// axios instance for users
 const jwt_Interceptor  = axios.create({
  baseURL: "https://server.sooraj.site",
  withCredentials: true,
});
// Add a request interceptor
jwt_Interceptor.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("UserToken");
    console.log(token, "toooooken in user");
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
jwt_Interceptor.interceptors.response.use(
  function (response) {
  
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {

    if (error.response) {
      // The request was made and the server responded with a non-2xx status code
      console.log(error.response.status);
      if (error.response.status === 401) {
        //  token is not found
        const response = await axios.post("https://server.sooraj.site/refresh", {
          refreshtoken: localStorage.getItem("UserRefreshToken"),
        })
        console.log(response,"response of refresh axios");
        if(response.status===200){
          localStorage.setItem("UserToken", response.data);
          console.log("here");
          const token=response.data
           error.config.headers.Authorization=`Bearer ${token}`;
          return axios(error.config)
        }else{
          console.log(error,"error in  else refresh failed");
          await axios.post('https://server.sooraj.site/logout',null,{}).then((res)=>{
             console.log(res,"res in refresh");
          }).catch((err)=>{
            console.log(err,"err in rf");
          })
        }
      }
    }
    return Promise.reject(error);
  }
);



// owner interceptor
owner_Interceptor.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log("req sent");
    // console.log(config, "req");
    const token = localStorage.getItem("ownerToken");
    console.log(token, "tooooken in owner");
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


owner_Interceptor.interceptors.response.use(
  function (response) {
  
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {

    if (error.response) {
      // The request was made and the server responded with a non-2xx status code
      console.log(error.response.status);
      if (error.response.status === 401) {
        //  token is not found
        const response = await axios.post("https://server.sooraj.site/owner/refreshowner", {
          refreshtoken: localStorage.getItem("ownerRefreshToken"),
        })
        console.log(response,"response of refresh axios");
        if(response.status===200){
          localStorage.setItem("ownerToken", response.data);
          console.log("here");
          const token=response.data
           error.config.headers.Authorization=`Bearer ${token}`;
          return axios(error.config)
        }else{
          console.log(error,"error in  else refresh failed owner");
          await axios.post('https://server.sooraj.site/owner/logout',null,{}).then((res)=>{
             console.log(res,"res in refresh owner");
          }).catch((err)=>{
            console.log(err,"err in rf");
          })
        }
      }
    }
    return Promise.reject(error);
  }
);

export default jwt_Interceptor;
