import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 🔍 Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/category/allcategories");
        setCategories(Array.isArray(res.data.data) ? res.data.data : []);
        setCategoriesLoading(false);
      } catch (err) {
        setError("Failed to load categories");
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await axios.get("/subcategory/allsubcategories");
        
        setSubcategories(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch subcategories", err);
      }
    };

    fetchSubcategories();
  }, []);

  const fetchProductsByCategory = async (categoryId) => {
    try {
      setError("");
      setProductsLoading(true);
      const res = await axios.get(`/product/category/${categoryId}`);
      setProducts(res.data.data || []);
      setSelectedCategory(categoryId);
      setProductsLoading(false);
    } catch (err) {
      setError("Failed to load products");
      setProducts([]);
      setSelectedCategory(null);
      setProductsLoading(false);
    }
  };

  // ✅ Filtered product list
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const price = parseFloat(product.offerPrice);
    const matchesMin = minPrice === "" || price >= parseFloat(minPrice);
    const matchesMax = maxPrice === "" || price <= parseFloat(maxPrice);

    const matchesSubcategory =
      selectedSubcategory === "" || product.subcategoryId === selectedSubcategory;

    return matchesSearch && matchesMin && matchesMax && matchesSubcategory;
  });

  return (
    <div className="container mt-4" style={{ marginTop: "100px" }}>
      <h2 className="text-center">Categories</h2>

      {error && <p className="text-center text-danger">{error}</p>}
      {categoriesLoading ? (
        <p className="text-center">Loading categories...</p>
      ) : (
        <div className="row">
          {categories.map((category) => (
            <div key={category._id} className="col-md-4 mb-3">
              <div
                className="card p-3 text-center shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() => fetchProductsByCategory(category._id)}
              >
                <h5>{category.name}</h5>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCategory && (
        <div className="mt-4">
          <button
            className="btn btn-secondary mb-3"
            onClick={() => {
              setSelectedCategory(null);
              setProducts([]);
              setSearchTerm("");
              setMinPrice("");
              setMaxPrice("");
              setSelectedSubcategory("");
              setError("");
            }}
          >
            Back to Categories
          </button>

          <h3 className="text-center mb-3">
            Products in{" "}
            {categories.find((cat) => cat._id === selectedCategory)?.name}
          </h3>

          {/* 🔍 Filter UI */}
          <div className="row mb-4">
            <div className="col-md-4 mb-2">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search by product name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4 mb-2">
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                style={{ minWidth: "200px" }}
              />
            </div>
            <div className="col-md-4 mb-2">
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{ minWidth: "200px" }}
              />
            </div>
            <div className="col-md-4 mb-2">
              <select
                className="form-control form-control-lg"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
              >
                <option value="">All Subcategories</option>
                {subcategories
                  .filter((sub) => sub.categoryId._id === selectedCategory)
                  .map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-12 col-lg-2 mb-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm("");
                  setMinPrice("");
                  setMaxPrice("");
                  setSelectedSubcategory("");
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* 🛒 Product List */}
          {productsLoading ? (
            <p className="text-center">Loading products...</p>
          ) : (
            <div className="row">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product._id} className="col-md-4 mb-3">
                    <Link
                      to={`/user/product-details/${product._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <div className="card p-3 text-center shadow-sm">
                        <img
                          src={product.productImageUrl1}
                          alt={product.productName}
                          className="img-fluid mb-2"
                          style={{
                            maxHeight: "200px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                        <h5>{product.productName}</h5>
                        <p>Price: ₹{product.offerPrice}</p>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-center w-100">
                  No products found matching the filters.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;
