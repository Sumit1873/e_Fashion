import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import "../../assets/style.css";
import { useNavigate } from 'react-router-dom';

const SellerAddress = () => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [existingAddress, setExistingAddress] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const userId = localStorage.getItem("id");

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }

        setLoading(true);
        try {
            await getAllStates();
            await fetchUserAddress();
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to load data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getAllStates = async () => {
        try {
            const res = await axios.get("/state/allstates");
            setStates(res.data.data);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    const getAllCities = async (stateId) => {
        if (!stateId) return;
        try {
            const res = await axios.get(`/city/getCityByStateId/${stateId}`);
            setCities(res.data.data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const getAllArea = async (cityId) => {
        if (!cityId) return;
        try {
            const res = await axios.get(`/area/getAreaByCityId/${cityId}`);
            setAreas(res.data.data);
        } catch (error) {
            console.error("Error fetching areas:", error);
        }
    };

    const fetchUserAddress = async () => {
        try {
            const res = await axios.get(`/address/getaddress/${userId}`);
            if (res.data.data.length > 0) {
                const addressData = res.data.data[0]; // Assuming single address per user
                setExistingAddress(addressData);

                // Prefill form fields
                Object.keys(addressData).forEach((key) => setValue(key, addressData[key]));

                // Load related city & area data
                if (addressData.stateId) await getAllCities(addressData.stateId);
                if (addressData.cityId) await getAllArea(addressData.cityId);
            }
        } catch (error) {
            console.error("Error fetching user address:", error);
        }
    };

    const submitHandler = async (data) => {
      setIsSubmitting(true);
      data.userId = userId;
  
      console.log("Submitting address data:", data);
  
      try {
          if (existingAddress && existingAddress._id) {
              console.log("Updating existing address:", existingAddress._id);
              await axios.put(`/address/updateaddress/${existingAddress._id}`, data);
              alert("Address updated successfully");
          } else {
              console.log("Adding new address");
              await axios.post("/address/add", data);
              alert("Address added successfully");
          }
          fetchUserAddress();

          navigate("/seller/profiles");
      } catch (error) {
          console.error("Error saving address:", error);
          alert("Failed to save address. Please try again.");
      } finally {
          setIsSubmitting(false);
      }
  };
  
  
    if (loading) {
        return <p>Loading user data...</p>;
    }

    return (
        <div className="justify-content-center align-items-center vh-100 bg-light mt-5 mb-5">
            <h1>User Profile</h1>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <label>Title</label>
                    <select {...register("title", { required: "Title is required" })}>
                        <option value="">Select title</option>
                        <option value="home">Home</option>
                        <option value="office">Office</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.title && <span className="error">{errors.title.message}</span>}
                </div>

                <div>
                    <label>Unit Name</label>
                    <input type="text" {...register("unitName", { required: "Unit Name is required" })} />
                    {errors.unitName && <span className="error">{errors.unitName.message}</span>}
                </div>

                <div>
                    <label>Street</label>
                    <input type="text" {...register("street", { required: "Street is required" })} />
                    {errors.street && <span className="error">{errors.street.message}</span>}
                </div>

                <div>
                    <label>Landmark</label>
                    <input type="text" {...register("landmark", { required: "Landmark is required" })} />
                    {errors.landmark && <span className="error">{errors.landmark.message}</span>}
                </div>

                <div>
                    <label>SELECT STATE</label>
                    <select
                        {...register("stateId", { required: "State is required" })}
                        onChange={(event) => {
                            getAllCities(event.target.value);
                            setValue("cityId", "");
                            setValue("areaId", "");
                        }}
                        disabled={states.length === 0}
                    >
                        <option value="">SELECT STATE</option>
                        {states.map((state) => (
                            <option key={state._id} value={state._id}>{state.name}</option>
                        ))}
                    </select>
                    {errors.stateId && <span className="error">{errors.stateId.message}</span>}
                </div>

                <div>
                    <label>SELECT CITY</label>
                    <select
                        {...register("cityId", { required: "City is required" })}
                        onChange={(event) => {
                            getAllArea(event.target.value);
                            setValue("areaId", "");
                        }}
                        disabled={cities.length === 0}
                    >
                        <option value="">SELECT CITY</option>
                        {cities.map((city) => (
                            <option key={city._id} value={city._id}>{city.name}</option>
                        ))}
                    </select>
                    {errors.cityId && <span className="error">{errors.cityId.message}</span>}
                </div>

                <div>
                    <label>SELECT AREA</label>
                    <select {...register("areaId", { required: "Area is required" })} disabled={areas.length === 0}>
                        <option value="">SELECT AREA</option>
                        {areas.map((area) => (
                            <option key={area._id} value={area._id}>{area.name}</option>
                        ))}
                    </select>
                    {errors.areaId && <span className="error">{errors.areaId.message}</span>}
                </div>

                <div>
                    <label>Pincode</label>
                    <input
                        type="number"
                        {...register("pincode", {
                            required: "Pincode is required",
                            pattern: { value: /^[0-9]{6}$/, message: "Invalid pincode" }
                        })}
                    />
                    {errors.pincode && <span className="error">{errors.pincode.message}</span>}
                </div>

                <div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : existingAddress ? "Update" : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SellerAddress;
