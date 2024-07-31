import mongoose, { Document, Model } from "mongoose";
import bcrypt from 'bcryptjs';

// Define the userSchema interface
export interface IUser extends Document{
    _id: string,
    firstname: string,
    email: string,
    password: string,
    matchedPassword: (enteredPassword: string) => Promise<boolean>;
    avatar: {
        public_id: string;
        url: string;
    }
}

const userSchema = new mongoose.Schema<IUser>({
    firstname: {
        type: String,
        required: [true, "First Name Required"]
    },
    
    email: {
        type: String,
        unique: true,
        required: [true, "Email Required"]
    },

    password: {
        type: String,
        required: [true, "Password Required!"],
        minLength: [8, "Password Must Contain At Least 8 Characters!"],
    },

    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
}); 

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Match password
userSchema.methods.matchedPassword = async function(enteredPassword: string): Promise<boolean>{
    return await bcrypt.compare(enteredPassword, this.password);
}

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;