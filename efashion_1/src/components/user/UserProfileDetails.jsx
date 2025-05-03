import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/UserProfile.css";

const UserProfileDetails = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`/user/userprofile/${userId}`);
        setUser(userResponse.data.data);

        const addressResponse = await axios.get(`/address/getaddress/${userId}`);
        setAddresses(addressResponse.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
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
      setIsEditing();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleAddress = () => {
    navigate(`/user/address`);
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
            <input type="date" name="dob" value={user.dob ? user.dob.split("T")[0] : ""} onChange={handleChange} inabled={!isEditing} />
          </div>
        </div>

        {isEditing ? (
          <button type="submit" className="save-btn">Save Changes</button>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)} className="edit-btn">Edit Profile</button>
        )}
      </form>

      <h2>Manage Addresses</h2>
            {addresses.length === 0 ? (
                <div>
                    <p>No address added yet.</p>
                    <button className="edit-btn" onClick={handleAddress}>Add Address</button>
                </div>
            ) : (
                addresses.map((address) => (
                    <div key={address._id} className="address-card">
                        <h4>{address.title.toUpperCase()}</h4>
                        <p>{address.unitName}, {address.street}, {address.landmark}</p>
                        <p>Pincode: {address.pincode}</p>
                        <button className="edit-btn" onClick={handleAddress}>Edit Address</button>
                    </div>
                ))
            )}
    </div>
  );
};

export default UserProfileDetails;
