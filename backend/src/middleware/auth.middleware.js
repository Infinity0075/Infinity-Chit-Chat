import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res.status(401).json({
        message: "Unothorized - token is not provieded",
      });
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: "Unothorized User - Invalid token",
      });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "Unothorized User - Invalid User",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in middleware of protectRoute!");
    res.status(401).json({
      success: false,
      message: "Internal Error in middleware of ProtectRoutes!",
    });
  }
};
