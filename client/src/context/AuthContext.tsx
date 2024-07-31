import React, { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../interfaces/user";
import { toast } from "react-toastify";

interface AuthContextProps {
    user: IUser | null;
    login: (email: string, password: string) => Promise<void>;
    register: (formData: FormData) => Promise<void>;
    updateProfile: (formData: FormData) => Promise<void>;
    logout: () => void;
}

const BACKEND_URL = "https://trello-web-app-backend.onrender.com";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        
        if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            const userToken = parsedUserInfo?.token || "";
            
            setUser(parsedUserInfo);

              // Set the token for axios default headers
            if (userToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
            }
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const { data } = await axios.post(`${BACKEND_URL}/api/v1/user/login`, { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data.userDetails));
            setUser(data.userDetails);

            toast.success("Logged in successfully!");
        } catch (error) {
            console.error('Login failed:', error);
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Server responded with a status other than 200 range
                    toast.error(`Login failed: ${error.response.data.message}`);
                } else if (error.request) {
                    // Request was made but no response received
                    toast.error("Login failed: No response from server. Please try again.");
                } else {
                    // Something else happened
                    toast.error(`Login failed: ${error.message}`);
                }
            } else {
                toast.error("Login failed. Please try again.");
            }
        }
    };

    const register = async (formData: FormData) => {
        try {
            const { data } = await axios.post(`${BACKEND_URL}/api/v1/user/register`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            localStorage.setItem('userInfo', JSON.stringify(data.createdUser));
            setUser(data.createdUser);

             // Ensure token is set
            if (data.createdUser.token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.createdUser.token}`;
            }

            toast.success("Registered successfully!");
        } catch (error) {
            console.error('Registration failed:', error);
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Server responded with a status other than 200 range
                    toast.error(`Registration failed: ${error.response.data.message}`);
                } else if (error.request) {
                    // Request was made but no response received
                    toast.error("Registration failed: No response from server. Please try again.");
                } else {
                    // Something else happened
                    toast.error(`Registration failed: ${error.message}`);
                }
            } else {
                toast.error("Registration failed. Please try again.");
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        toast.info("Logged out successfully.");
    };

    const updateProfile = async(updatedData: FormData) => {
        try {
            const { data } = await axios.put(`${BACKEND_URL}/api/v1/user/update`, updatedData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${user?.token}`,
                },
            });
            localStorage.setItem('userInfo', JSON.stringify(data.responseUser));
            setUser(data.responseUser);
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("Update profile failed:", error);
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Server responded with a status other than 200 range
                    toast.error(`Profile update failed: ${error.response.data.message}`);
                } else if (error.request) {
                    // Request was made but no response received
                    toast.error("Profile update failed: No response from server. Please try again.");
                } else {
                    // Something else happened
                    toast.error(`Profile update failed: ${error.message}`);
                }
            } else {
                toast.error("Profile update failed. Please try again.");
            }
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
