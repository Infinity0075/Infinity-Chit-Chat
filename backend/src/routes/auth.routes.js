import express from "express";
import {
  login,
  logout,
  onBoard,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup); //Signup page Routes
router.post("/login", login); //Login page Routes
router.post("/logout", logout); //Logout page Routes

//Oboarding:
router.post("/onboarding", protectRoute, onBoard);
//check if user is Loged in or Not??

router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
    message: "User is Login Successfully!!",
  });
});

export default router;
