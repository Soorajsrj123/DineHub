import { Auth } from "../Api/axiosAuthinstance"

export const getAllOwners=async()=>{

 try {
    const  response= await  Auth.get('/admin/getowners')
          return response.data
 } catch (error) {
    throw error.response
 }
}

export const UnBlockOwner=async(id)=>{
    try {
        const response= await Auth.put(`/admin/owners/unblock/${id}`)

       
        
        return response.data

    } catch (error) {
        throw error.response
    }
}

export const BlockOwner=async(id)=>{

    try {
        const response=await Auth.put(`/admin/owners/block/${id}`)
      
        return response.data
    } catch (error) {
        throw error.response
    }

}

export const getAllUsers=async()=>{
   
    try {
        const response=await Auth.get('/admin/get-users')
        return response.data
    } catch (error) {
       
        throw error
    }
}

export const getRestaurantsRequest=async(resId)=>{
try {
  
    const response=await Auth.get(`/admin/view-restaurant-request/${resId}`)
    return response.data

} catch (error) {
    throw error
}

}

export const RestaurantApprove = async(resId)=>{
try {
       
    const result=await Auth.patch(`/admin/approve-restaurant/${resId}`)
    return result.data

} catch (error) {
    throw error
}
}

export const RejectRestaurant=async(details,id)=>{
    try {
        const response=await Auth.patch(`/admin/reject-restaurant/${id}`,details)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getDeclineRequests=async()=>{
    try {
        const response=await Auth.get('/admin/restaurant/declined-requests')
        return response.data
    } catch (error) {
        throw error
    }
}

export const getRestaurantDetailById=async(restaurantId)=>{
    try {
        const response=await Auth.get(`/admin/restaurant/get-one-restaurant/${restaurantId}`)
        return response.data
    } catch (error) {
        throw error
    }
}
