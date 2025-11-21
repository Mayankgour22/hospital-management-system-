const bcrypt  =require("bcryptjs");
const jwt  = require("jsonwebtoken");
const User = require("../models/user");
const signup = async (req, res) => {
  try {
    const { name, email, password, role, specialization } = req.body;

   
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

  
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      specialization: role === "doctor" ? specialization : undefined,
    });

    await newUser.save();
    console.log(newUser)
    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
  
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email);

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log(" No user found");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(" Error in login:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query; 
    const filter = role ? { role } : {};

    const users = await User.find(filter).select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports={
    signup,
    login,
    getAllUsers
}
