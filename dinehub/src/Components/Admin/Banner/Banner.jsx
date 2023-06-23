import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getAllBanners} from '../../../helpers/adminHelpers'



function Banner() {

    const[banners,setBanner]=useState([])


  useEffect(()=>{
        getAllBanners().then((res)=>{
            if(res){
               setBanner(res.allBanners)
            }
        })
  },[])

  console.log(banners,"banners here");

  return (
    <>
      <div className="container">
        <div className="flex">
          <Link to='/admin/restaurant/add-banner' className="bg-blue-500 text-white p-3 rounded-lg lg:w-auto m-5 hover:bg-blue-950 ">
            ADD BANNER
          </Link>
        </div>
        <div>
          <div className="flex flex-wrap justify-center">
            {
                banners.map((item,index)=>(
        
                    <Card key={index} className="mt-6 w-96 mr-4">
              <CardHeader color="blue-gray" className="relative h-56 mx-3">
                <img
                  src={item.imageURL?item.imageURL:""}
                  alt="img-blur-shadow"
                  className="object-cover w-full h-full"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h6">Category: {item.title}</Typography>

                <div className="flex justify-evenly "></div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button className="ml-3 bg-red-600">DELETE</Button>
              </CardFooter>
            </Card>
                ))
}
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
