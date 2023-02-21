import express from "express";
import { signIn, signUp } from "../controllers/auth";

const router = express.Router();

router.post("/register", signUp);
router.post("/login", signIn);

export default router;
