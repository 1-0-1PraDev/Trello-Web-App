import { Response, Request } from "express";
import User from "../models/User";
import { IUser } from "../models/User";
import generateToken from "../utils/generateToken";
import { FileArray, UploadedFile } from "express-fileupload";
import bcrypt from 'bcryptjs';

import { v2 as cloudinary } from 'cloudinary';

interface authRequest extends Request{
    user?: IUser;
    files?: FileArray | null;
}

export const registerUser = async(req: authRequest, res: Response) => {
    try{
        if (!req?.files || !req.files.avatar) {
            res.status(400).json({
                success: false,
                message: 'Avatar is required'
            });
        }

        const avatar  = req?.files?.avatar as UploadedFile;

        const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
            (avatar as any).tempFilePath,
            { folder: "AVATAR" }    
          );

          if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
            console.error(
              "Cloudinary Error:",
              cloudinaryResponseForAvatar.error || "Unknown Cloudinary error"
            );

            res.status(400).json({
                success: false,
                message: "Failed to upload avatar to Cloudinary"
            })
          }
        
        const { firstname, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if(userExists){
            res.status(400).json({
                message: 'User already exists.'
            });
        }
    
        const user = new User(
            { 
                firstname,
                email,
                password,
                avatar: {
                    public_id: cloudinaryResponseForAvatar.public_id,
                    url: cloudinaryResponseForAvatar.secure_url
                }
            }
        );
        
        await user.save();
    
        if(user){
            const createdUser = {
                _id: user._id,
                firstname: user.firstname,
                email: user.email,
                token: generateToken(user._id as string),
                avatar: user.avatar
            }
            res.status(201).json({
                message: 'User Registered Successfully',
                createdUser
            });
        }
    }catch(err){
        res.status(500).json({ message: (err as Error).message });
    }
}

export const authUser = async(req: Request, res: Response) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email });
        
        if(user && await user.matchedPassword(password)){
            const userDetails = {
                _id: user._id,
                firstname: user.firstname,
                email: user.email,
                token: generateToken(user._id as string),
                avatar: user.avatar
            }
            res.json({
                message: 'User logged in Successfully',
                userDetails
            });
        }else{
            res.status(400).json({ message: 'Invalid email or password' });
        }
    }catch(err){
        res.status(500).json({ message: (err as Error).message });
    }
}   

export const getUser = async(req: authRequest, res: Response) => {
    if(req.user){
        const user = await User.findOne({ _id: req.user?._id }).select('-password');
        res.status(200).json({
            success: 'true',
            user
        });
    }else{
        res.status(400).json({ message: 'User Not Found' });
    }
}

export const updateProfile = async(req: authRequest, res: Response) => {
    const updatedData = { ...req.body };

    try{
        const userId = req?.user?._id;
        
        if(req.files && req.files.avatar) {
            const avatar = req.files.avatar as UploadedFile;
            const user = await User.findById(userId);
            const profileImageId = user?.avatar.public_id || "";

            // Move the file to a temporary location
            const tempFilePath = `/tmp/${avatar.name}`;
            await avatar.mv(tempFilePath);
            await cloudinary.uploader.destroy(profileImageId);
            
            const newProfileImage = await cloudinary.uploader.upload(
              tempFilePath,
              {
                folder: "PROFILE AVATAR",
              }
            );
            
            updatedData.avatar = {
              public_id: newProfileImage.public_id,
              url: newProfileImage.secure_url,
            };
        }

        if (updatedData.password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(updatedData.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate<IUser | null>(userId, updatedData, { 
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const responseUser = {
            _id: updatedUser._id.toString(),
            firstname: updatedUser.firstname,
            email: updatedUser.email,
            token: generateToken(updatedUser._id.toString()),
            avatar: updatedUser.avatar,
        };

        res.status(200).json({
            success: true,
            message: "Profile Updated successfully",
            responseUser
        });
    }catch(err){
        console.error(err);
        res.status(500).json({ 
            success: false,
            message: 'Error updating profile' 
        });
    }
}