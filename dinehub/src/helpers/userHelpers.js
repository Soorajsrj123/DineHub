


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

export async function 
UserLogin(credentials) {
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

export const isExistingNumber=async(phoneNumber,userId)=>{
     const number=parseInt(phoneNumber)
     try {
      const response=await Auth.post(`/get-phone/${userId}`,{phoneNumber:number})
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



