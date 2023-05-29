import Owner from "../Models/OwnerModel.js";
import Restaurant from "../Models/RestaurantSchema.js";

import bcrypt from "bcrypt";

export const OwnerRegistration = async (req, res, next) => {
  const { email, password, phone, id } = req.body;

  try {
    const OwnerEmail = new Promise((resolve, reject) => {
      if (!email) reject(new Error("enter a valid email"));
      resolve();
    });

    const OwnerPassword = new Promise((resolve, reject) => {
      if (!password) reject(new Error("enter a valid Password"));
      resolve();
    });
    console.log(OwnerPassword, OwnerEmail);
    return Promise.all([OwnerPassword, OwnerEmail])
      .then(async () => {
        const owner = await Owner.findOne({ email });

        if (owner)
          return res
            .status(400)
            .json({ message: "Email was already Registered" });
        const existingPhoneNo = await Owner.findOne({ phone });
        if (existingPhoneNo)
          return res
            .status(400)
            .json({ message: "PhoneNumber already registered" });
        if (password) {
          bcrypt.hash(password, 10, async (err, hashedPass) => {
            if (err)
              return res.status(400).json({ message: "Authenticaton err" });

            // Finging Restaurant details Using Restaurant Id
            const RegistrationDetails = await Restaurant.findById({ _id: id });

            const newOwner = new Owner({
              email,
              password: hashedPass,
              RestaurantName: RegistrationDetails.restaurantName,
              phone,
              owner: RegistrationDetails.ownerName,
              RestaurantId: id,
            });
            newOwner.save().then((data) => {
              res
                .status(200)
                .json({ message: "SignUp succesfully", owner: newOwner });
            });
          });
        }
      })
      .catch((err) => {
        console.log(err.message, "the erro ");
        res.status(400).json({ message: err.message });
      });
  } catch (error) {
    console.log(error, "rtyuiuytr");
    res.status(500).json({ message: error });
  }
};

export const OwnerLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    //checking if the email is exist or not

    let owner = await Owner.findOne({ email: email });

    if (owner) {
      let validOwner = await bcrypt.compare(password, owner.password);

      if (validOwner) {
        if (!owner.isBlocked) {
          return res.status(200).json({ message: "login success", owner });
        } else {
          return res.status(403).json({
            message:
              "Your account has been blocked. Please contact support for assistance",
          });
        }
      } else {
        res.status(400).json({ message: "wrong password" });
      }
    } else {
      res.status(400).json({ message: "email not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};
