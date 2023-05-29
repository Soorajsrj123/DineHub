import { Auth } from "../Api/axiosAuthinstance"

export const getPendingRequests=async()=>{

    try {
        
        const dbresponse=await Auth.get('/admin/restaurant/pending-request')
        return dbresponse.data

    } catch (error) {
        throw error
    }
}

export const getRestaurants=async()=>{

    try {

        const response=await Auth.get('/admin/restaurants')
        return response.data
    } catch (error) {
        throw error
    }

}