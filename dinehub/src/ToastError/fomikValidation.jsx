import { toast } from "react-hot-toast"
const minlength=6

export const DishValidation=(values)=>{
  
       let error={}
    if(!values.dishName)error.dishName=toast.error("dishName name required")
    else if(!values.description)error.description=toast.error("description required")
    else if(values.description.length<minlength)error.description=toast.error("description must be valid one")
    else if(!values.category)error.category=toast.error("category required")
    else if(!values.price)error.category=toast.error("price required")
    return error
}

