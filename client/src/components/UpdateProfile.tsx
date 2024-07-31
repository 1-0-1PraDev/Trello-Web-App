import React, { useState, useEffect } from "react";
import '../styles/updateprofile.css';
import { useAuth } from "../context/AuthContext";
import Header from "./Header";

interface UpdateProfileProps {
    onProfileUpdate: () => void;
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({ onProfileUpdate }) => {
    const { user, updateProfile } = useAuth();

    const [formData, setFormData] = useState({
        firstname: '',
        email: '',
        password: '',
        avatar: null as File | null,
    });

    const [avatarPreview, setAvatarPreview] = useState<string | ArrayBuffer | null>(null);

    const handleImg = (file: File) => {
        const reader = new FileReader();

        if(file){
            reader.readAsDataURL(file);
            reader.onload = () => {
                setAvatarPreview(reader.result);
            }
        }
    }

    useEffect(() => {
        if (user) {
            setFormData({
                firstname: user.firstname || '',
                email: user.email || '',
                password: '', 
                avatar: null ,
            });

            if (user.avatar?.url) {
                setAvatarPreview(user.avatar.url);
            }
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            handleImg(files?.[0] as File);

            setFormData(prevState => ({
                ...prevState,
                [name]: files ? files[0] : null
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('called');
        const updatedData = new FormData();
        
        updatedData.append('firstname', formData.firstname);
        updatedData.append('email', formData.email);
        
        if (formData.password) {
            updatedData.append('password', formData.password);
        }
        
        if (formData.avatar) {
            updatedData.append('avatar', formData.avatar);
        }

        try{
            await updateProfile(updatedData);
            onProfileUpdate();
        }catch(err){
            console.error(err);
        }
    };

    return (
        <div className="updateProfileBx" style={{color: '#fff'}}>
            <Header />
            <div className="updateProfileContainer">

            <h1>Update Your Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="inputBx">
                    <label htmlFor="firstname">First Name:</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="inputBx">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="inputBx">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="inputBx">
                    <label htmlFor="" className="file-label">Avatar:</label>
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        onChange={handleChange}
                        className="file-input"
                    />
                    <label htmlFor="avatar" className="btn btn-primary custom-file-upload">
                        Choose File
                    </label>
                </div>

                <div className="selectedImgPreview">
                    {avatarPreview && (
                        <img src={avatarPreview as string} alt="Avatar Img" style={{ width: '100%', height: '300px', objectFit: 'contain' }}  />
                    )}
                </div>
                <button type="submit" className="btn btn-secondary">Update Profile</button>
            </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
