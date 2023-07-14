import { Auth } from "../Api/axiosAuthinstance";
import { baseUrl } from "../Api/axiosInterseptors";

export const getPendingRequests = async () => {
  try {
    const dbresponse = await baseUrl.get("/admin/restaurant/pending-request");
    return dbresponse.data;
  } catch (error) {
    throw error;
  }
};

export const getRestaurants = async () => {
  try {
    const response = await baseUrl.get("/admin/restaurants");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserDetailsById = async (userId) => {
  try {
    const response = await Auth.get(`/get-one-user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
