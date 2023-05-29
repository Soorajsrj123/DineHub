import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import {MdTableRestaurant} from 'react-icons/md'
import {FcWiFiLogo} from 'react-icons/fc'
import {FaParking} from 'react-icons/fa'
import {getRestaurantDetailById} from '../../helpers/adminHelpers'
import Ac from '../../assets/air-conditioner.png'
import { useParams } from 'react-router-dom'


function ViewRestaurant() {
    
    const [record,setRecord]=useState('')
    const {id}=useParams()
  
    useEffect(()=>{
         const details=getRestaurantDetailById(id)
         details.then((data)=>{
            if(data.status){
                    setRecord(data.restaurantData)
            }
         }).catch((err)=>{
            console.log(err,"erre");
         })
    },[id])

console.log(record,"recorddd");
  return (
    <>
   <section class="text-gray-600 body-font overflow-hidden">
  <div class="container px-5 py-12 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={record?record.image.url:"https://static.vecteezy.com/system/resources/previews/000/582/613/original/photo-icon-vector-illustration.jpg"}/>
      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest">OWNER: {record.ownerName}</h2>
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{record.restaurantName}</h1>
        <div class="flex mb-4">
         
        </div>
        <p class="leading-relaxed">{record.description}</p>
        <div className='flex mt-5' >
        {/* <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME: Sooraj</h2> */}
        </div>
        <div className='flex flex-col mt-5 ' >
            <h3 className='font-bold text-2xl text-black' >ADDRESS</h3>
        <h2 class="text-sm leading-relaxed title-font pt-4 text-gray-500 tracking-widest">{record.address}</h2>
        </div>
        <div class="flex mt-8 items-center  pb-5 border-b-2 border-gray-100 mb-5">
         
          <div class="flex">
            <span class="mr-3 mt-3 font-serif ">Facilites</span>
            {record?.wifi?
            <FcWiFiLogo  size={40}  />:""}
            {/* <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button> */}
           { record?.parking?<FaParking className='ml-7 ' color='green' size={40}  />:""}
            {/* <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button> */}
           {record?.aircondition? <img src={Ac} alt='kk' className="border-2 border-gray-300  rounded w-9 h-9 ml-6 focus:outline-none"/>:""}
          </div>
    
          {/* <div class="flex ml-6 items-center">
            <span class="mr-3">Size</span>
            <div class="relative">
              <select class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                <option>SM</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
              <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div> */}
        </div>
      
      <div className='flex'>

      <MdTableRestaurant size={39} color='gray' className='title-font font-medium text-2xl text-gray-900' />
      <span className='font-bold text-2xl text-black '  >&nbsp;&nbsp; {record.tables}</span>
      
      </div>
      <div className='flex my-4 ' >
      <h2 class="text-sm title-font font-serif text-green-500 tracking-widest ">OPEN:{record.startTime}</h2>
      </div>
      <div className='flex' >
      <h2 class="text-sm title-font font-serif text-red-500 tracking-widest">CLOSE: {record.endTime}</h2>
      </div>
      <div className='flex mt-2'>

      <span className='font-bold text-2xl text-blue-400  '  >FSSC</span>
      <span className='font-bold text-2xl text-black '  >&nbsp;&nbsp; {record.fssc}</span>
      
      </div>
             
          
        {/* <div class="flex">
            
          <span class="title-font font-medium text-2xl text-gray-900">$58.00</span>
          <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
          <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div> */}
      </div>
    </div>
  </div>
  
</section>
</>
  )
}

export default ViewRestaurant