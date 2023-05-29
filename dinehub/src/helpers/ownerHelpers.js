import { Auth } from "../Api/axiosAuthinstance"




export async function OwnerSignUp(values){
 
   return new Promise((resolve, reject) => {
          Auth.post('/owner/signup',values).then((data)=>{
            console.log(data,"=>DATA")
            resolve(data);
          }).catch((err)=>{
            console.log(err,"=>ERROR");
            console.log(err,"=>DATA")
            reject(err)
          })
   })

}

export async function OwnerLogin(values)
{
       return new Promise((resolve, reject) => {
          Auth.post('/owner/login',values).then((data)=>{
          
           resolve(data)
          
        }).catch((err)=>{
          reject(err)
        })
       })
}

export const RestaurantForm=async(values,owner)=>{
          try {
            const ownerId=owner.owner
             const response=await Auth.post(`/owner/add-restaurant/${ownerId}`,values)
             console.log(response,"rseeeeeeeeeeeeeeeeee");
             return response.data
          } catch (error) {
            console.log(error);
            throw error.response.data
          }
}

export const getdata=async(ownerid)=>{
  try {
    console.log("called resssssssss");
    const response=await Auth.get(`/owner/restaurants/${ownerid}`)
   return response.data
  } catch (error) {
    throw(error)
  }
}

export const deleteRes=async(resId)=>{
try {
  console.log("comes here");
   const response=await Auth.get(`/owner/delete-restaurant/${resId}`)
   console.log(response);
   return response.data

} catch (error) {
  console.log(error);
  throw (error)
}
}

export const singleResDetails=async(resId)=>{
  try {
    const response=await Auth.get(`/owner/get-one-res/${resId}`)
    console.log(response,"lassr res");
    return response.data.data
    
  } catch (error) {
    console.log(error);
    throw error 
  }
}

export const updateDetails=async(resDetails)=>{
  try {
    const response=await Auth.patch(`/owner/edit-restaurant`,resDetails)
    return response.data
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const AddDishes=async (details)=>{
 
  try {
    const response=await Auth.post('/owner/add-dish-details',details)
    return response.data
    
  } catch (error) {
    console.log(error,"err");
    throw error
  }
}

export const getDishes =async(ownerId)=>{
 
  try {

    const response=await Auth.get(`/owner/dishes/${ownerId}`)
    return response.data
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const deleteDish=async(resId,ownerId)=>{
try {
  const response=await Auth.delete(`/owner/delete-dish/${resId}/${ownerId}`)
  return response.data
} catch (error) {
  throw error
}
}

export const singleDishDetails=async (dishId)=>{

   try {
    const response=await Auth.get(`/owner/get-one-dish/${dishId}`)
    return response.data.singleDish
   } catch (error) {
    throw error
   }

}

export const editDish=async(details,dishId)=>{

  try {
    const response=await Auth.patch(`/owner/edit-dish/${dishId}`,details)
    return response.data
  } catch (error) {
    throw error
  }

}

export const tableForm=async(values)=>{
  try {
    const response=await Auth.post('/owner/add-table',values)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getAllTables=async(ownerId)=>{
   try {
    const response=await Auth.get(`/owner/tables/${ownerId}`)
    return response.data
   } catch (error) {
    throw error
   }
}

export const deleteTable = async(tableId,ownerId)=>{
 
  try {
    const response=await Auth.delete(`/owner/delete-table/${tableId}/${ownerId}`)
    return response.data
  } catch (error) {
    throw error
  }

}

export const singleTableDetails=async(ownerId)=>{
  try {
     const response= await Auth.get(`/owner/get-one-table/${ownerId}`)
     return response.data.data
  } catch (error) {
     throw error
  }
}

export const editTable=async(tableDetails,tableId)=>{
  try {
    const response=await Auth.patch(`/owner/edit-table${tableId}`,tableDetails)
    return response.data
  } catch (error) {
    throw error
  }
}