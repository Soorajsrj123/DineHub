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

export default function Example() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


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

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex - 1);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="mt-2" >
      <Carousel className="rounded-lg">
      <div
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '600px',
      }}
    >
     <div className="pt-40  " >
     <StyledHeading>
      {title[currentImageIndex]}
    </StyledHeading>

     </div>
      </div>
      </Carousel>
      <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={previousImage}
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={nextImage}
        >
          <FiChevronRight size={24} />
        </button>
    </div>
  );
}
