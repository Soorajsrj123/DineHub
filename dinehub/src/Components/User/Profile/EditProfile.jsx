import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetailsById } from "../../../helpers/commonHelper";
import { useFormik } from "formik";
import "./EditProfile.css";
import { updateUserProfile } from "../../../helpers/userHelpers";
import { Toaster, toast } from "react-hot-toast";
function EditProfile() {
  const [records, setRecords] = useState("");
  const [email, setEmail] = useState("");
  const [PhoneNumber, setMobile] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const userId = useParams();
  const navigate = useNavigate();

  const { id } = userId;
  useEffect(() => {
    getUserDetailsById(id).then((res) => {
      if (res) {
        setRecords(res.details);
        setName(res.details.name);
        setEmail(res.details.email);
        setMobile(res.details.PhoneNumber);
        setImage(res.details.imageURL.url ? res.details.imageURL.url : "");
      }
    });
  }, []);

  const handleImage = (e) => {
    console.log(e.target.files[0]);
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
      name: "",
      email: "",
      PhoneNumber: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: () => {
      const allDatas = { name, email, PhoneNumber, userId, image };

      const details = updateUserProfile(allDatas);
      toast.promise(details,{
        loading:"please wait",
        success:"Profile Updated",
        error:"profile not updated"
      }).then(()=>{
        navigate(`/profile/${id}`)
      })
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div class="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6 flex flex-col md:flex-row">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div class="w-full h-full rounded border border-1 shadow border-gray-300 flex items-center ps-10">
          <div class="profile-icon">
            <img
              src={
                records?.imageURL?.url
                  ? records?.imageURL?.url
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile Icon"
            />
            <input type="file" id="profile-image" accept="image/*" />
          </div>

          <h1 class="text-small font-medium flex sm:text-4xl sm:ms-9">
            {records?.name?.toUpperCase()}
          </h1>
        </div>
      </div>

      <h1 className="text-center text-2xl font-bold underline">
        Personal Information
      </h1>
      <div className="flex items-center justify-center p-12">
        {/* <Toaster position="top-center" reverseOrder={false} /> */}
        <div className="mx-auto w-full max-w-[550px]">
          <div class="-mx-3 flex flex-wrap">
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label
                  for="date"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label
                  for="time"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  email
                </label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div class="-mx-3 flex flex-wrap justify-center">
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label
                  for="time"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Mobile
                </label>
                <input
                  type="text"
                  name="city"
                  id="lName"
                  value={PhoneNumber}
                  onChange={(e) => setMobile(e.target.value)}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div class="mb-5 flex flex-col justify-center items-center ">
            <label
              for="image"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Update Profile
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImage}
              class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <img
              className="w-40 mt-3"
              src={
                image
                  ? image
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt=""
            />
          </div>

          <div>
            <button
              type="submit"
              class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditProfile;
