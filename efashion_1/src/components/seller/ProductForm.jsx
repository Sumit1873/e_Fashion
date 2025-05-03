import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [subcategories, setSubcategories] = useState([]);
  const selectedCategory = watch("categoryId");

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get("/subcategory/allsubcategories");
        console.log(response.data.data)
        setSubcategories(response.data.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    fetchSubcategories();
  }, []);

  const submitHandler = async (data) => {
    const Id = localStorage.getItem("id");

    if (!Id) {
      alert("User ID not found. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("categoryId", data.categoryId);
    formData.append("subcategoryId", data.subcategoryId);
    formData.append("basePrice", data.basePrice);
    formData.append("offerPrice", data.offerPrice);
    formData.append("offerPercentage", data.offerPercentage);
    formData.append("productDetails", data.productDetails);
    formData.append("quantity", data.quantity);
    formData.append("userId", Id); // Add user ID

    // Append files safely
    if (data.productImageUrl1[0]) formData.append("productImageUrl1", data.productImageUrl1[0]);
    if (data.productImageUrl2[0]) formData.append("productImageUrl2", data.productImageUrl2[0]);
    if (data.productImageUrl3[0]) formData.append("productImageUrl3", data.productImageUrl3[0]);

    console.log("Final FormData Entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const res = await axios.post("product/addProductWithFile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response:", res.data);
      alert("Product added successfully!");
      navigate("/seller/productlist");
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert("Failed to add product: " + (error.response?.data?.error || "Unknown error"));
    }
  };


  return (
    <div className="container" >
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit(submitHandler)} encType="multipart/form-data">
        <div>
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            {...register("productName", { required: "Product Name is required" })}
          />
          {errors.productName && <p className="text-danger">{errors.productName.message}</p>}
        </div>

        <div>
          <label>Category</label>
          <select
            className="form-control"
            {...register("categoryId", { required: "Category is required" })}
          >
            <option value="">Select Category</option>
            <option value="67c6c6e07681cd11e43c52f0">Mens</option>
            <option value="67c6c6ef7681cd11e43c52f2">Womens</option>
            <option value="6801d2f93d71132ab0d6e226">Kids</option>
          </select>
          {errors.categoryId && <p className="text-danger">{errors.categoryId.message}</p>}
        </div>

        <div>
          <label>SubCategory</label>
          <select
            className="form-control"
            {...register("subcategoryId", { required: "SubCategory is required" })}
          >
            <option value="">Select SubCategory</option>
            {subcategories
              .filter((sub) => sub.categoryId?._id === selectedCategory)
              .map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
          </select>
          {errors.subcategoryId && <p className="text-danger">{errors.subcategoryId.message}</p>}
        </div>

        <div>
          <label>Base Price</label>
          <input
            type="number"
            className="form-control"
            {...register("basePrice", { required: "Base Price is required", min: 1 })}
          />
          {errors.basePrice && <p className="text-danger">{errors.basePrice.message}</p>}
        </div>
        <div>
          <label>Offer Price</label>
          <input
            type="number"
            className="form-control"
            {...register("offerPrice", { required: "Offer Price is required", min: 1 })}
          />
          {errors.offerPrice && <p className="text-danger">{errors.offerPrice.message}</p>}
        </div>
        <div>
          <label>Offer Percentage</label>
          <input
            type="number"
            className="form-control"
            {...register("offerPercentage", { required: "Offer Percentage is required", min: 0, max: 100 })}
          />
          {errors.offerPercentage && <p className="text-danger">{errors.offerPercentage.message}</p>}
        </div>
        <div>
          <label>Product Description</label>
          <input
            type="text"
            className="form-control"
            {...register("productDetails", { required: "Product Description is required" })}
          />
          {errors.productDetails && <p className="text-danger">{errors.productDetails.message}</p>}
        </div>
        <div>
          <label>Product Image 1</label>
          <input
            type="file"
            className="form-control"
            {...register("productImageUrl1", { required: "Product Image 1 is required" })}
          />
          {errors.productImageUrl1 && <p className="text-danger">{errors.productImageUrl1.message}</p>}
        </div>
        <div>
          <label>Product Image 2</label>
          <input
            type="file"
            className="form-control"
            {...register("productImageUrl2", { required: "Product Image 2 is required" })}
          />
          {errors.productImageUrl2 && <p className="text-danger">{errors.productImageUrl2.message}</p>}
        </div>
        <div>
          <label>Product Image 3</label>
          <input
            type="file"
            className="form-control"
            {...register("productImageUrl3", { required: "Product Image 3 is required" })}
          />
          {errors.productImageUrl3 && <p className="text-danger">{errors.productImageUrl3.message}</p>}
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            {...register("quantity", { required: "Quantity is required", min: 1 })}
          />
          {errors.quantity && <p className="text-danger">{errors.quantity.message}</p>}
        </div>
        <div>
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
