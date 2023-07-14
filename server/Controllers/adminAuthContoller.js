import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../Models/AdminModel.js";

export const AdminSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res
        .status(400)
        .json({ message: "Email is incorrect", status: false });
    let isValidPass = await bcrypt.compare(password, admin.password);
    if (!isValidPass)
      return res
        .status(400)
        .json({ message: "password incorrect", status: false });

    //   CREATING A TOKEN
    let token = Jwt.sign(
      { admin_id: admin._id, email: email },
      "my secret key",
      {
        expiresIn: "2h",
      }
    );
    //  SETTING COOKIES IN RESPONSE
    res.cookie(String(admin._id), token, {
      path: "/admin",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      samesiteL: "lax",
    });
    res
      .status(200)
      .json({ message: "Logged in succesfully", token, admin, status: true });
  } catch (error) {
    console.log(error, "errrrrrrr in Admin Login");
    res
      .status(400)
      .json({ message: "authentication err", error: error, status: false });
  }
};
