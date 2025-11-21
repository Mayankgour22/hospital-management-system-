const express=require("express");
const authController = require("../controllers/authController.js");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/users", authController.getAllUsers); 
module.exports=router;
