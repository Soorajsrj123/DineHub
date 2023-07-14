// import jwt from "jsonwebtoken";


// export const VerifyToken = async (req, res, next) => {
//   try {
//     const authorizationHeader = req.headers.authorization;
// // CHEKING TOKEN IS AVAILABLE ON THE HEADER

//     if (!authorizationHeader) {
//       return res.status(401).json({ message: "Unauthorized: Token missing" });
//     }
    
//     const tokenData = authorizationHeader.split(" ");
//     const token = tokenData[1];
//     // VERIFYING TOKEN
//     const decode = jwt.verify(token, "my secret key");
//     console.log(decode);
//     if (decode) {
//       next();
//     } else {
//       console.log("errr");
//     //   TOKEN IS NOT PRESETN OR TOKEN IS INVALID
//       return res.status(401).json({ message: "unautherized" });
//     }
//   } catch (error) {
//     console.log(error,"??>>");
//     return res.status(500).json({ message: "internal error" });
//   }
// };


