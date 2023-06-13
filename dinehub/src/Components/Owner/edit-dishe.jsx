import React, { useEffect, useState } from "react";
import { useFormik} from "formik";
import { Toaster, toast } from "react-hot-toast";
import { singleDishDetails } from "../../helpers/ownerHelpers";
import { useNavigate, useParams } from "react-router-dom";

import { editDish } from "../../helpers/ownerHelpers";

function EditDish() {
  const navigete = useNavigate();

    

  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [image, setImage] = useState("");
  //to get each dish id
  const { id } = useParams();
  useEffect(() => {
    singleDishDetails(id).then((data) => {

      setDishName(data.dishName);
      setDescription(data.description);
      setCategory(data.category);
      setPrice(data.price);
      setImage(data.image.url);    
      
    });
  }, [id]);


 const validate=()=>{
 
  const errors={}
   if(!dishName) errors.dishName=toast.error("res name is required")
   else if(!description) errors.description=toast.error("des is req")
   else if(!category)errors.category=toast.error("category is required")
   else if(!price)errors.price=toast.error("price is required")
   
   return errors
 }



  const handleResImage = (e) => {
    const file = e.target.files[0];
    TransformFile(file);
  };

  const TransformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  };

  const formik = useFormik({
    initialValues: {
      dishName: "",
      description: "",
      category: "",
      price: "",
    },
   validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async () => {

      const img = { image: image };
      const datas = { dishName, price, category, description };
     
      const allDetails = Object.assign({}, img, datas);
      const response = await editDish(allDetails, id);
      if (response.message == "success") {
        navigete("/owner/dishes");
      } else {
        toast.error("somethig went wrong");
      }
    },
  });


  return (
    <div className="p-10">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
    
      <form onSubmit={formik.handleSubmit} className="mx-auto max-w-lg">
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
          Dish Name
        </label>
        <input
          name="dishName"
          className="w-full border border-gray-400 p-2 rounded-md mb-4"
          type="text"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          id="dishName"
        />
     
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
          Description
        </label>
        <input
          name="description"
          className="w-full border border-gray-400 p-2 rounded-md mb-4"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
        />
      
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
          Category
        </label>
        <input
          name="category"
          className="w-full border border-gray-400 p-2 rounded-md mb-4"
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          id="category"
        />
     
        <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
          Price
        </label>
        <input
          name="price"
          className="w-50 border border-gray-400 p-2 rounded-md mb-4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          min="1"
          id="price"
        />
       
      
        <div className="py-5">
          <input
            onChange={handleResImage}
            id="file"
            name="image"
            type="file"
            className="file-input file-input-bordered file-input-accent w-full max-w-xs"
          />

          <img
            className="py-4"
            width="200px"
            src={image ? image : ""}
            height="200px"
            alt="preview"
          ></img>
        </div>

        <div className="space-x-1">
          <button
            className=" bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            type="submit"
          >
            Submit
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditDish;
