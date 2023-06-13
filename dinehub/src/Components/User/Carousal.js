// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { authActions } from '../../store'
// import { Auth } from '../../Api/axiosAuthinstance'



// function Home() {

// const [values,setValues]=useState('')
// const dispatch=useDispatch()
// const isLoggedIn=useSelector((state)=>state.isLoggedIn)
// const navigate=useNavigate()
//  console.log(values,"isLoggedIn");

//  LOGOUT
// const sendLogoutReq=async ()=>{
//   let res=await axios.post('http://localhost:4000/logout',null,{
//   withCredentials:true
// }).catch(err=>console.log(err))
//   console.log(res,"ress");
//     if(res.status==200)
//     {
//       return res

//     }
//     return new Error ("Enable to Logout")
// }

// const handleLogout=async()=>{

//            sendLogoutReq().then(()=>dispatch(authActions.logOut())).catch(err=>console.log(err))
// }
 
  //  let refreshToken=async()=>{
  //   let res=await axios.get('http://localhost:4000/refresh',{
  //     withCredentials:true
  //   }).catch(err=>console.log(err))

  //   let data=await res.data
  //   return data
  //  }

  //  const sendRequest=async ()=>{
  //   let response= await Auth.get('/home',{
  //     withCredentials:true
  //   }).catch(err=>console.log(err))

  //   let data=await response.data
  //   return data
  //  }

  //  useEffect(()=>{
  
  //     // verifying token and setting the user data
  //     sendRequest().then((data)=>setValues(data.user))
  
    // // for Refreshing the token
    // // interval will be expiered after every 28 sec 
    // let interval=setInterval(()=>{
    //   refreshToken().then((data)=>setValues(data.user))
    // },1000*28)

    // return ()=>{
    //   clearInterval(interval)
    // }
          
  //  },[])
   

  
// }

// export default Home

import { useState } from "react";
import { Carousel } from "@material-tailwind/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styled from "styled-components";


const StyledHeading = styled.h3`
  color: white;
  font-weight: bold;
  font-family: "Helvetica", sans-serif;
  font-size: 32px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  /* Add any other custom styles you want */
`;

  const images = [
    "https://fenwaytriangle.com/wp-content/uploads/2023/04/BCAM4922-1536x1024.jpg",
    "https://images.getbento.com/accounts/19fcad6c1fd057f294461dacf26ebe27/media/images/3241JT4_9721.jpg?w=1800&fit=max&auto=compress,format"
    // Add more image URLs here
    
  ];
  const title=[
    "ENJOY THE MOMENT WITH US",
    "WE ENSURE YOUR PRIVACY"
  ]

export default function Example() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  

  const backgroundImageStyle = {
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0,-0.3), rgba(0, 0, 0, -0.3)), url("https://cdn.pixabay.com/photo/2017/07/31/11/22/man-2557408_1280.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundBlendMode: 'multiply',
  };


  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex - 1);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <section class="bg-gray-900  text-white" style={backgroundImageStyle} >
    <div
      class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center"
    >
      <div class="mx-auto max-w-3xl text-center">
        <h1
          class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
        >
          Understand User Flow.
  
          <span class="sm:block"> Increase Conversion. </span>
        </h1>
  
        <p class="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo
          tenetur fuga ducimus numquam ea!
        </p>
  
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <a
            class="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            href="/get-started"
          >
            Get Started
          </a>
  
          <a
            class="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
            href="/about"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
  );
}
