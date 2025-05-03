import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProductAdmin = () => {
  const { id } = useParams(); // productId from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    basePrice: "",
    offerPrice: "",
    offerPercentage: "",
    productDetails: "",
    quantity: "",
    categoryId: "",
    subcategoryId: "",
  });

  const [images, setImages] = useState({});

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/product/getProductById/${id}`);
      const data = res.data.data;
      setFormData({
        productName: data.productName,
        basePrice: data.basePrice,
        offerPrice: data.offerPrice,
        offerPercentage: data.offerPercentage,
        productDetails: data.productDetails,
        quantity: data.quantity,
        categoryId: data.categoryId?._id,
        subcategoryId: data.subcategoryId?._id,
      });
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages({ ...images, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateForm = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      updateForm.append(key, value);
    });

    Object.entries(images).forEach(([key, file]) => {
      updateForm.append(key, file);
    });

    try {
      await axios.put(`/product/update/${id}`, updateForm);
      alert("Product updated!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="update-product-form">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="productName" value={formData.productName} onChange={handleInputChange} placeholder="Product Name" required />
        <input type="number" name="basePrice" value={formData.basePrice} onChange={handleInputChange} placeholder="Base Price" required />
        <input type="number" name="offerPrice" value={formData.offerPrice} onChange={handleInputChange} placeholder="Offer Price" required />
        <input type="number" name="offerPercentage" value={formData.offerPercentage} onChange={handleInputChange} placeholder="Offer %" required />
        <textarea name="productDetails" value={formData.productDetails} onChange={handleInputChange} placeholder="Details" required />
        <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="Quantity" required />
        <input type="text" name="categoryId" value={formData.categoryId} onChange={handleInputChange} placeholder="Category ID" required />
        <input type="text" name="subcategoryId" value={formData.subcategoryId} onChange={handleInputChange} placeholder="Subcategory ID" required />

        <p>Upload New Images (optional):</p>
        <input type="file" name="productImageUrl1" onChange={handleFileChange} />
        <input type="file" name="productImageUrl2" onChange={handleFileChange} />
        <input type="file" name="productImageUrl3" onChange={handleFileChange} />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProductAdmin;
