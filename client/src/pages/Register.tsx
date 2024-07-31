import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/register.css";

const Register: React.FC = () => {
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<
    string | ArrayBuffer | null
  >(null);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatar(file);
        setAvatarPreview(reader.result);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("firstname", firstname);
    formData.append("email", email);
    formData.append("password", password);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      if (
        email.trim() !== "" &&
        password.trim() !== "" &&
        firstname.trim() !== ""
      ) {
        await register(formData);
        navigate("/");
      }
    } catch (err) {
      console.error("Registration Failed ", err);
    }
  };

  return (
    <>
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <h1>
            Welcome to <span>Workflo!</span>
          </h1>
          <div className="inputBx">
            <input
              type="text"
              placeholder="Enter firstname"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="inputBx">
            <input
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputBx">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="inputBx">
            <label htmlFor="" className="file-label">
              Select Avatar:
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleImg}
              className="file-input"
            />
            <label
              htmlFor="avatar"
              className="btn btn-primary custom-file-upload"
            >
              Choose File
            </label>
          </div>

          <div
            className="imgPreviewBx"
            style={{
              height: (avatarPreview && "180px") || "",
            }}
          >
            {avatarPreview && (
              <img src={avatarPreview as string} alt="user avatar image" />
            )}
          </div>
          <button type="submit" className="btn btn-secondary">Sign up</button>
          <div className="footer">
            <p>Already have an account ?</p>
            <Link to="/login">Log in</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
