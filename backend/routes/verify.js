import express from "express";

import jwt from "jsonwebtoken";
import { userSchema } from "../models/index.js";

const verifyRouter = express.Router();
verifyRouter.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    const user = await userSchema.findOne({ email: decoded.email });

    if (!user) return res.status(400).send("Invalid token or user not found.");
    if (user.isVerified) return res.send("Email already verified.");

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.send("Email verified successfully!");
  } catch (err) {
    res.status(400).send("Verification link expired or invalid.");
  }
});

export default verifyRouter;
