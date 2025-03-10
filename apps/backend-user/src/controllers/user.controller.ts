import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, response, Response } from "express";
import userModel from "../model/user.model";
import bcrypt from "bcryptjs";

export const signup = async (req: Request, res: Response): Promise<any> => {
  const { name, email, username, password, bio, skills, profilepic } = req.body;
  console.log(req.body);

  try {
    if (!name || !email || !username || !password || !skills || !bio) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    const isexists = await userModel.findOne({ username });
    if (isexists) {
      return res.status(301).json({
        message: "user already exists",
      });
    }

    const hashedpass = await bcrypt.hash(password, 10);
    if (!hashedpass) {
      return res.status(400).json({
        message: "password hashing failed",
      });
    }

    const newuser = await userModel.create({
      name,
      username,
      email,
      password: hashedpass,
      bio,
      skills,
      profilepic,
    });

    console.log("user created: ", newuser);

    const token = jwt.sign({ id: newuser.username }, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });
    return res.status(201).json({
      message: "user created successfully",
      token: token,
      user: newuser,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "error signup",
      result: error.message,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required",
      });
    }

    const isthere = await userModel.findOne({ username });
    if (!isthere) {
      return res.status(400).json({
        message: "username not found",
      });
    }

    const isPassCorrect = await bcrypt.compare(password, isthere.password!);
    if (!isPassCorrect) {
      return res.status(400).json({
        message: "password is incorrect",
      });
    }

    const token = jwt.sign({ id: isthere.username }, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });
    return res.status(200).json({
      message: "login successful",
      token: token,
      user: isthere,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "error while login",
      result: error.message,
    });
  }
};

export const extractUserInformationn = async (
  req: Request,
  res: Response
): Promise<any> => {
  let usertoken = req.headers.authorization;

  if (!usertoken || !usertoken.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authorization token missing or invalid" });
  }

  usertoken = usertoken.split(" ")[1];

  try {
    const decoded = jwt.verify(
      usertoken,
      process.env.JWT_SECRET!
    ) as JwtPayload;
    const username = decoded.id;

    console.log("username extracted from token is: " + username);

    const tokenUser = await userModel.findOne({ username });

    if (!tokenUser) {
      return res.status(400).json({
        message: "username not found",
      });
    }

    return res.status(201).json({
      message: "user information extracted successfully",
      user: tokenUser,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "error while extracting user information from token",
      errormessage: error.message,
    });
  }
};

export const allUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const response = await userModel.find();

    if (!response) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(201).json({
      message: "users found successfully",
      users: response,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "error while fetching all users",
      errormessage: error.message,
    });
  }
};


export const updateUserInfo = async (req: Request, res: Response): Promise<any> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    const secretKey: string = process.env.JWT_SECRET as string;
    const decoded: any = jwt.verify(token, secretKey);

    const username = decoded.id;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only the provided fields dynamically
    const updates = req.body;
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Invalid profile data" });
    }

    console.log("Updating profile with:", updates);

    const updatedUser = await userModel.findOneAndUpdate(
      { username },
      { $set: updates },
      { new: true } 
    );

    return res.status(200).json({ updatedUser });
  } catch (err) {
    console.error("Error updating profile:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const addUserInfor = async(req: Request, res: Response): Promise<any> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    const secretKey: string = process.env.JWT_SECRET as string;
    const decoded: any = jwt.verify(token, secretKey);

    const username = decoded.id;
    const user: any = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("user is: ", user);

    const {field,item}: {field: any, item: any} = req.body;
    console.log(field,item);
  

    const updateduser = await userModel.findOneAndUpdate(
      { username },
      { $push: { [field]: item } },
      { new: true } 
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User information updated successfully",
      user: updateduser
    })
    
  } catch (error) {
    console.log("error adding user information: ", error);
    return res.status(500).json({
      message: "internal server error"
    })
  }
}
