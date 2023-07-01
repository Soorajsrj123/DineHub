


import { Auth } from "../Api/axiosAuthinstance";

export async function UserRegistration(credentials) {
  // console.log(credentials,'namma credentials');
  return new Promise((resolve, reject) => {
    Auth.post("/register", credentials)
      .then((data) => {
        console.log(data.data, " data");
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function UserLogin(credentials) {
  console.log(credentials, "cred");
  return new Promise((resolve, reject) => {
    Auth.post("/login", credentials)
      .then((data) => {
        console.log(data, "response data");
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function SigninGoogle(userdata) {
  return new Promise((resolve, reject) => {
    Auth.post("/googleSignup", userdata)
      .then((res) => {
        console.log(res, "resss");
        resolve(res);
      })
      .catch((error) => {
        console.log(error,"errrr");
        reject(error)});
  });
}

export async function loginGoogle(userdata){
            return new Promise((resolve, reject) => {
              Auth.post("/googleLogin",userdata).then((res)=>{
                console.log(res);
                resolve(res)
              }).catch((err)=>{
                console.log(err);
                reject(err)
              })
            })
}

export const isExistingNumber=async(phoneNumber)=>{
     const number=parseInt(phoneNumber)
     try {
      const response=await Auth.post(`/get-phone`,{phoneNumber:number})
      return response.data
     } catch (error) {
      return error.response.data
     }
 
}

export const getUserData=async(phoneNumber)=>{
  console.log("called user phone");
  try {
    const response=await Auth.post('/get-user',{phoneNumber:phoneNumber})
      return response.data
  } catch (error) {
    console.log(error,"heee");
     throw error
  }

}


export const updatePassword=async(details)=>{

  try {
    const response=await Auth.patch('/update-password',details)
      return response.data
  } catch (error) {
    console.log(error,"heee");
     throw error
  }

}

export const getRestaurantDishes=async(resId)=>{

  try {
     const response=await Auth.get(`/restaurant/get-dishes/${resId}`)
     return response.data
  } catch (error) {
    throw error
  }

}

export const getRestaurant=async(resId)=>{
  try {
   
     const response=await Auth.get(`/restaurant/get-one-restaurant/${resId}`)
     return response.data
  } catch (error) {
     throw error
  }
}

export const getRestaurantTables=async(resId)=>{
 try {
  const response=await Auth.get(`/restautant/get-tables/${resId}`)
  return response.data
 } catch (error) {
  throw error
 }
}

export const getRestaurants=async()=>{

  try {

      const response=await Auth.get('/restaurants/get-all-restaurants')
      return response.data
  } catch (error) {
      console.log(error);
      throw error
  }

}

export const bookedOrders=async(userId,date,time)=>{
  try {
      
    const response=await Auth.get(`/restaurant/get-booked-orders?id=${userId}&&date=${date}&&time=${time}`,)
    return response.data
    
  } catch (error) {

     console.log(error,"err");
     throw error
  }
}

export const checkOutData=async(orderDetails)=>{
 try {
   
  const response=await Auth.post('/restaurant/checkout',orderDetails)

  return response.data
 } catch (error) {
  throw error
 }
}

export const paymentDetails=async(datas,bookingAddress)=>{
  try {
    console.log(datas,"datas ");
    const response=await Auth.post('/restaurant/confirm-payment',{datas,bookingAddress})
    return response.data
  } catch (error) {
    throw error
  }
}

export const UserOrderDetails=async(userId)=>{
try {
   const response=await Auth.get(`/restaurant/get-order-details/${userId}`)
   return response.data
} catch (error) {
  throw error
}
}

export const getRestaurantDetails=async(restaurantId)=>{
  try {
    
    const response=await Auth.get(`/restaurant/get-res-details/${restaurantId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const AddRating=async(details)=>{
  try {
    const response=await Auth.post('/restaurant/add-rating',details)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateUserProfile=async(credentials)=>{
 try {
  const response=await Auth.patch('/update-user-profile',credentials)
   return response.data
 } catch (error) {
   throw error
 }
}

export const deleteUserReview=async(bannerId)=>{
  try {
    const response=await Auth.delete(`/delete-user-review/${bannerId}`)
    return response.data
  } catch (error) {
    throw error
  }
}