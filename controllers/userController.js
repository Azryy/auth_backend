import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

//handling Registration
export const Register = async (req, res) => {
  try {
    const { name, email, password, srcode } = req.body;

    //check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    //hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      srcode,
      password: hashedPassword,
      status: "pending",
    });

    await newUser.save();

    console.log(`New registration pending for: ${email}`);
    res
      .status(201)
      .json({
        message:
          "Your account is under review by the admin. Please wait for a few minutes",
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const login = async(req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            res.status(400).json({message:"Please complete the form first"})
        }

        const user = await User.findOne({email});
        if (!user) {
            // If user is not found, return an error
            return res.status(404).json({ message: "User not found" });
          }

          //check if the password is match
          const isMatch = await bcrypt.compare(password, user.password)
          if (!isMatch) {
            return res.status(400).json({message:"Your password is incorrect"})
          }

          //create a JWT Token
          const token = jwt.sign(
            {userId: user._id, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )


       if (user.status !== 'approved') {
        return res.status(400).json({message:"Your account is still pending or has been rejected"})
       }

        return res.status(200).json({message:"Login successful", token, 
            user:{
                id: user._id,
                email: user.email,
                name: user.name,
                status: user.status,
            }
        })
    } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Error signing user", error: error.message });
    }
}