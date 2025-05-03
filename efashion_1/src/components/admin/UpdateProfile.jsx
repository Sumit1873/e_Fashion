import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/UserProfile.css";

const UpdateProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`/user/userprofile/${userId}`);
                setUser(userResponse.data.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (userId) fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/user/profile/${userId}`, user);
            alert("Profile updated successfully!");
            setUser(response.data.data);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
        navigate(`/admin/dashboardd`); // Redirect to user profile page after update
    };

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            <form onSubmit={handleUpdate}>
                <div className="inline-group">
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" value={user.firstName} onChange={handleChange} inabled={!isEditing} />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} inabled={!isEditing} />
                    </div>
                </div>

                <div className="inline-group">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={user.email} disabled />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="text" name="phone" value={user.phone} onChange={handleChange} inabled={!isEditing} />
                    </div>
                </div>

                <div className="inline-group">
                    <div className="form-group">
                        <label>Gender</label>
                        <select name="gender" value={user.gender} onChange={handleChange} inabled={!isEditing}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={user.dob ? user.dob.split("T")[0] : ""}
                            onChange={handleChange}
                            inabled={!isEditing}
                        />
                    </div>
                </div>

                {isEditing ? (
                    <button type="submit" className="save-btn">Save Changes</button>
                ) : (
                    <button type="button" onClick={() => setIsEditing(true)} className="edit-btn">Edit Profile</button>
                )}
            </form>
        </div>
    );
};

export default UpdateProfile;
