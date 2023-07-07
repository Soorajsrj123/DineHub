import axios from "axios";

export const Auth = axios.create({
  baseURL: "https://server.sooraj.site",
  withCredentials: true,
});

export const cloudinaryUpload= axios.create({
  baseURL:"cloudinra"
})