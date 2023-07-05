import { Auth } from "../Api/axiosAuthinstance";

export async function OwnerSignUp(values) {
  return new Promise((resolve, reject) => {
    Auth.post("/owner/signup", values)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function OwnerLogin(values) {
  return new Promise((resolve, reject) => {
    Auth.post("/owner/login", values)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const RestaurantForm = async (values) => {
  try {
    const response = await Auth.post("/owner/add-restaurant", values);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getdata = async (restaurantId) => {
  try {
    const response = await Auth.get(`/owner/restaurants/${restaurantId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRes = async (resId) => {
  try {
    const response = await Auth.get(`/owner/delete-restaurant/${resId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const singleResDetails = async (resId) => {
  try {
    const response = await Auth.get(`/owner/get-one-res/${resId}`);

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateDetails = async (resDetails) => {
  try {
    const response = await Auth.patch(`/owner/edit-restaurant`, resDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddDishes = async (details) => {
  try {
    const response = await Auth.post("/owner/add-dish-details", details);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDishes = async (ownerId) => {
  try {
    const response = await Auth.get(`/owner/dishes/${ownerId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDish = async (resId, restaurantId) => {
  try {
    const response = await Auth.delete(
      `/owner/delete-dish/${resId}/${restaurantId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const singleDishDetails = async (dishId) => {
  try {
    const response = await Auth.get(`/owner/get-one-dish/${dishId}`);
    return response.data.singleDish;
  } catch (error) {
    throw error;
  }
};

export const editDish = async (details, dishId) => {
  try {
    const response = await Auth.patch(`/owner/edit-dish/${dishId}`, details);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const tableForm = async (values) => {
  try {
    const response = await Auth.post("/owner/add-table", values);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTables = async (ownerId) => {
  try {
    const response = await Auth.get(`/owner/tables/${ownerId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTable = async (tableId, ownerId) => {
  try {
    const response = await Auth.delete(
      `/owner/delete-table/${tableId}/${ownerId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const singleTableDetails = async (ownerId) => {
  try {
    const response = await Auth.get(`/owner/get-one-table/${ownerId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const editTable = async (tableDetails, tableId) => {
  try {
    const response = await Auth.patch(
      `/owner/edit-table${tableId}`,
      tableDetails
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const isExistingNumber = async (phoneNumber) => {
  const number = parseInt(phoneNumber);
  try {
    const response = await Auth.post("/owner/get-phone", {
      phoneNumber: number,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updatePassword = async (datas) => {
  try {
    const response = await Auth.patch("/owner/update-password", datas);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const SetRestaurantBanners = async (allDatas) => {
  try {
    const response = await Auth.post("/owner/restaurant/add-banner", allDatas);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllRestaurantBanners = async (restaurantId) => {
  try {
    const response = await Auth.get(`/owner/restaurant/banner/${restaurantId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserReview = async (restaurantId, userId) => {
  try {
    const response = await Auth.get(
      `/owner/restaurant?resId=${restaurantId}&userId=${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteRestaurantBanner = async (bannerId) => {
  try {
    const response = await Auth.delete(
      `/owner/restaurant/delete-banner/${bannerId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ownerYearlyReport = async (restaurantId) => {
  try {
    const response = await Auth.get(
      `/owner/restaurant/yearly-datas/${restaurantId}`
    );
    return response.data;
  } catch (error) {}
};

export const ownerMonthlyReport = async (restaurantId) => {
  try {
    const response = await Auth.get(
      `/owner/restaurant/monthly-data/${restaurantId}`
    );
    return response.data;
  } catch (error) {}
};

// not Used YET
export const averageRating = async (restaurantId) => {
  try {
    const { data } = await Auth.get(
      `/owner/restaurant/average-rating/${restaurantId}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const userOrderDetails = async (restarantId) => {
  try {
    const response = await Auth.get(`/owner/users/all-orders/${restarantId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const ownerDailyReport = async (restarantId) => {
  try {
    const response = await Auth.get(
      `/owner/restaurant/daily-data/${restarantId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
