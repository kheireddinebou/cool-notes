import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import UserModel from "../models/user";

interface SignUpBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  password: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> =  async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const passwordRaw = req.body.password;
    const jwtSec: any = process.env.JWT_SEC;

    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      res.status(409).json({ type: "email", message: "This email is exist!" });
      return;
    }

    const encryptrdPassword = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: encryptrdPassword,
    });

    const { password, ...others } = newUser._doc;

    const token = JWT.sign({ id: newUser._id }, jwtSec);

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(201)
      .json(others);
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};

interface SignInBody {
  email?: string;
  password: string;
}

export const signIn: RequestHandler<
  unknown,
  unknown,
  SignInBody,
  unknown
> = async (req, res) => {
  try {
    const email = req.body.email;
    const passwordRaw = req.body.password;
    const jwtSec: any = process.env.JWT_SEC;

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      res
        .status(403)
        .json({ type: "email", message: "This email is not exist!" });
      return;
    }

    const passwordMatch = await bcrypt.compare(passwordRaw, user.password);

    if (!passwordMatch) {
      res
        .status(403)
        .json({ type: "password", message: "incorrect password!" });
      return;
    }

    const { password, ...others } = user._doc;

    const token = JWT.sign({ id: user._id }, jwtSec);

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};
