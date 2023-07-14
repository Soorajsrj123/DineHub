import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { getDishes } from "../../helpers/ownerHelpers";
import { deleteDish } from "../../helpers/ownerHelpers";
import Swal from "sweetalert2";
function ViewDishes() {
  const navigate=useNavigate()
  const data = useSelector((state) => state?.owner?.owner);
  const { owner } = data;
  const [allDishes, setDishes] = useState([]);

  const hadleDelete = async (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result?.isConfirmed) {
        const response = await deleteDish(itemId, owner);
           console.log(response,"response in delete dish");
           if(response.status===401){
            navigate('/owner/login')
           }
        setDishes(response?.data?.allDishes);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    const details = getDishes(owner);
    details.then((data) => {
      setDishes(data?.allDishes);
    }).catch((err)=>{
      console.log(err,"err in owner list dish");
      if(err.response.status===401){
        navigate('/owner/login')
      }
    })
  }, [owner,navigate]);

  return (
    <div>
      <div className="flex w-max items-end gap-4">
        <Link to="/owner/add-dish">
          <Button size="md" className="px-10 py-5 mx-4 bg-slate-600">
            ADD DISH
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap justify-center">
        {allDishes?.reverse().map((items, index) => (
          <Card key={index} className="mt-6 w-96 mr-4">
            <CardHeader color="blue-gray" className="relative h-56 mx-3">
              <img
                src={items?.image?.url}
                alt="img-blur-shadow"
                className="object-cover w-full h-full"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {items?.dishName?.toUpperCase()}
              </Typography>
              <Typography variant="h5">Price: {items?.price}</Typography>
              <Typography variant="h6">Category: {items?.category}</Typography>
              <Typography>{items?.description}</Typography>
              <div className="flex justify-evenly "></div>
            </CardBody>
            <CardFooter className="pt-0">
              <Link to={`/owner/edit-dish/${items?._id}`}>
                <Button className="mr-3 px-8 py-3">EDIT</Button>
              </Link>
              <Button
                onClick={() => hadleDelete(items?._id)}
                className="ml-3 bg-red-600"
              >
                DELETE
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ViewDishes;
