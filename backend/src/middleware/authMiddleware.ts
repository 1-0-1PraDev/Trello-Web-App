import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User from "../models/User";
import { IUser } from "../models/User";

interface authRequest extends Request{
    user?: IUser
}

export const authMiddlware = async(req: authRequest, res: Response, next: NextFunction) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decodedData = jwt.verify(token, process.env.JWT_SECRET || '') as jwt.JwtPayload;
            const user = await User.findById(decodedData.id).select('-password');
            if(user){
                req.user = user;
                next();
            } else {
                res.status(401).json({ message: 'Not authorized, user not found' });
            }
        }catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
}