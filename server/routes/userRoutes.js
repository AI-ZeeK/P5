import express from "express";
let router = express.Router();
import {
  registerUser,
  getMe,
  loginUser,
  githublogin,
  googlelogin,
  googleregister,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { passportConfig } from "../config/passport-config.js";

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/googlelogin", googlelogin);
router.post("/googleregister", googleregister);

router.get("/me", protect, getMe);
passportConfig(router);
router.post("/githublogin", githublogin);

export default router;
