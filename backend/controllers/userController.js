import { userSchema } from "../models/index.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utilis/sendEmail.js";

async function register(req, res, next) {
  try {
    const body = req.body;

    if (!body) {
      return next(createHttpError(400, "fileds are required"));
    }
    const isEmailInUse = await userSchema.findOne({ email: body.email });

    if (isEmailInUse) {
      return next(
        createHttpError(
          400,
          "Email already exist!, please use another email or log in "
        )
      );
    }
    const { email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign(
      { email },
      process.env.SECRET_TOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );
    const user = {
      email: req.body.email,
      password: hashedPassword,
      userName: body.userName,
      verificationToken,
    };

    const verifyLink = `${process.env.BASE_URL}/verify/${verificationToken}`;
    const message = `<h2>Email Verification</h2><p>Click <a href="${verifyLink}">here</a> to verify your account.</p>`;

    await sendEmail(email, "Verify your account", message);

    const newUser = new userSchema(user);
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Successfully created",
      data: newUser,
    });
    return;
  } catch (error) {
    return next(error);
  }
}

export { register };
