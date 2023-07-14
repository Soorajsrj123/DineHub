import Owner from "../Models/OwnerModel.js";
import Restaurant from "../Models/RestaurantSchema.js";
import jwt from 'jsonwebtoken'
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
              RestaurantId: RegistrationDetails._id,
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
    console.log(error, "owner conrollers");
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
        const accessToken=jwt.sign({owner_id:owner._id,email},"owner secret key",{expiresIn:"1m"})
        const refreshToken=jwt.sign({owner_id:owner._id,email},"owner secret key",{expiresIn:"35d"})
       console.log(refreshToken,"refresh token");
        if (!owner.isBlocked) {
          return res.status(200).json({ message: "login success", owner,accessToken,refreshToken});
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


export const vefifyOwner = (req, res, next) => {
  try {
    console.log(req.headers, "hd");
    let authorization = req.headers.authorization;
    console.log(authorization, "token  in owner header");
    if (authorization) {
      console.log("owner autherization exist");
      const accesstoken = authorization.split(" ")[1];

      if (!accesstoken) {
        console.log("inside no !accesstoken");
        return res.status(401).json({ message: "no token found" });
      }
      jwt.verify(accesstoken, "owner secret key", (err, owner) => {
        if (err) {
          console.log(err, "err in verify jwt");
          return res.status(401).json({ message: "token expired" });
        }
        console.log(owner, "owner in verify token");
        req.id = owner.owner_id;
        next();
      });
    } else {
      console.log("outer  else");
      return res.status(401).send("token not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const refreshTokenOwner = (req, res, next) => {
  try {
    let { refreshtoken } = req.body;
    console.log(refreshtoken, "token  in refresh token owner");
    // let Prevtoken = authorization.split(" ")[1];
    if (!refreshtoken) {
      return res.status(401).json({ message: "refresh token not found in owner" });
    }
    jwt.verify(refreshtoken, "owner secret key", (err, owner) => {
      if (err) {
        console.log(err, "err in refresh owner");
        return res.status(401).json({ message: "Authentication failed in owner" });
      }
      // CLEARING THE PREVIOUS headers
      req.headers.authorization = "";
      // req.cookies[`${user.user_id}`] = "";
      // CREATING THE NEW token

      let token = jwt.sign(
        { owner_id: owner.owner_id, email: owner.email },
        "owner secret key",
        {
          expiresIn: "20d",
        }
      );

      req.id = owner.owner_id;
      console.log(token, "a new token created on owner side");
      return res.status(200).send(token);
      // next(); //it calls the vefiry fn
    });
  } catch (error) {
    console.log(error, "err in refreh token owner");
  }
};