import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Seller = () => {
  const { roleId } = useParams();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`/user/by-role/${roleId}`);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch sellers:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleId]);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this seller?")) return;
    try {
      await axios.delete(`/user/users/${userId}`);
      alert("Seller deleted successfully!");
      fetchUsers(); // Refresh
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete seller.");
    }
  };

  const handleUpdate = (userId) => {
    navigate(`/admin/update-user/${userId}`);
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Seller List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user._id} className="p-4 bg-white shadow rounded">
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <div className="mt-2 space-x-2">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => handleUpdate(user._id)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seller;
