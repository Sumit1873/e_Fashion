const productModel = require('../models/ProductModel');
const cloudinaryUtil = require('../utils/CloudinaryUtil');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed"), false);
        }
        cb(null, true);
    },
}).fields([
    { name: "productImageUrl1", maxCount: 1 },
    { name: "productImageUrl2", maxCount: 1 },
    { name: "productImageUrl3", maxCount: 1 },
]);


const addProduct = async (req, res) => {
    try {
        const savedProduct = await productModel.create(req.body);
        res.status(201).json({
            message: "Product created successfully",
            data: savedProduct,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error",
            data: err.message,
        });
    }
}

const getAllProduct = async (req, res) => {
    const allProduct = await productModel.find().populate("categoryId").populate("subcategoryId").populate("userId");
    res.status(200).send({
        message: "all Product",
        data: allProduct
    })
}

const addProductWithFile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log("Multer Error:", err);
            return res.status(500).json({ message: "Error uploading files", data: err.message });
        }

        console.log("Uploaded Files:", req.files); // Debugging

        // Ensure all required files are uploaded
        if (!req.files || !req.files["productImageUrl1"] || !req.files["productImageUrl2"] || !req.files["productImageUrl3"]) {
            return res.status(400).json({ success: false, message: "At least 3 images are required" });
        }

        try {
            // Upload images to Cloudinary
            const uploadedImages = await Promise.all([
                cloudinaryUtil.UploadFileToCloudinary(req.files["productImageUrl1"][0].path),
                cloudinaryUtil.UploadFileToCloudinary(req.files["productImageUrl2"][0].path),
                cloudinaryUtil.UploadFileToCloudinary(req.files["productImageUrl3"][0].path),
            ]);

            console.log("Cloudinary Upload Results:", uploadedImages); // Debugging

            // Ensure Cloudinary URLs exist
            if (!uploadedImages[0] || !uploadedImages[1] || !uploadedImages[2]) {
                return res.status(500).json({ message: "Image upload failed" });
            }
        
        // ✅ Save product with correct model
        const newProduct = await productModel.create({
            productName: req.body.productName,
            categoryId: req.body.categoryId,
            subcategoryId: req.body.subcategoryId,
            basePrice: req.body.basePrice,
            offerPrice: req.body.offerPrice,
            offerPercentage: req.body.offerPercentage,
            productDetails: req.body.productDetails,
            productImageUrl1: uploadedImages[0].url,  // ✅ Correct
            productImageUrl2: uploadedImages[1].url,  // ✅ Correct
            productImageUrl3: uploadedImages[2].url,  // ✅ Correct
            quantity: req.body.quantity,
            userId: req.body.userId,
        });
        

        console.log("Saving Product:", newProduct);
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ error: "Failed to save product" });
    }
});
};




const getAllProductByUserId = async (req, res) => {
    try {
        const products = await productModel
            .find({ userId: req.params.userId })
            console.log(products)

        if (products.length === 0) {
            res.status(404).json({ message: "No product found" });
        } else {
            res.status(200).json({
                message: "product found successfully",
                data: products,
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params; // Extract product ID from request parameters

        const product = await productModel.findById(id).populate("categoryId").populate("subcategoryId");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product found successfully",
            data: product,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error fetching product",
            data: err.message,
        });
    }
};

const getProductsByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Find products that belong to the specified category
        const products = await productModel.find({ categoryId });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found for this category" });
        }

        res.status(200).json({
            message: "Products found",
            data: products,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error retrieving products",
            error: err.message,
        });
    }
};

const getTotalProductCount = async (req, res) => {
    try {
        const count = await productModel.countDocuments();
        res.status(200).json({
            message: "Total number of products",
            total: count
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to get product count",
            error: err.message
        });
    }
};

const updateProduct = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error("Multer Error:", err);
            return res.status(500).json({ message: "Error uploading files", data: err.message });
        }

        try {
            const { id } = req.params;

            // Find existing product
            const existingProduct = await productModel.findById(id);
            if (!existingProduct) {
                return res.status(404).json({ message: "Product not found" });
            }

            let updatedImageUrls = {
                productImageUrl1: existingProduct.productImageUrl1,
                productImageUrl2: existingProduct.productImageUrl2,
                productImageUrl3: existingProduct.productImageUrl3,
            };

            // Update images if new ones are uploaded
            if (req.files["productImageUrl1"]) {
                const result = await cloudinaryUtil.UploadFileToCloudinary(req.files["productImageUrl1"][0].path);
                updatedImageUrls.productImageUrl1 = result.url;
            }
            if (req.files["productImageUrl2"]) {
                const result = await cloudinaryUtil.UploadFileToCloudinary(req.files["productImageUrl2"][0].path);
                updatedImageUrls.productImageUrl2 = result.url;
            }
            if (req.files["productImageUrl3"]) {
                const result = await cloudinaryUtil.UploadFileToCloudinary(req.files["productImageUrl3"][0].path);
                updatedImageUrls.productImageUrl3 = result.url;
            }

            // Update product details
            const updatedProduct = await productModel.findByIdAndUpdate(
                id,
                {
                    productName: req.body.productName || existingProduct.productName,
                    categoryId: req.body.categoryId || existingProduct.categoryId,
                    subcategoryId: req.body.subcategoryId || existingProduct.subcategoryId,
                    basePrice: req.body.basePrice || existingProduct.basePrice,
                    offerPrice: req.body.offerPrice || existingProduct.offerPrice,
                    offerPercentage: req.body.offerPercentage || existingProduct.offerPercentage,
                    productDetails: req.body.productDetails || existingProduct.productDetails,
                    productImageUrl1: updatedImageUrls.productImageUrl1,
                    productImageUrl2: updatedImageUrls.productImageUrl2,
                    productImageUrl3: updatedImageUrls.productImageUrl3,
                    quantity: req.body.quantity || existingProduct.quantity,
                    userId: req.body.userId || existingProduct.userId,
                },
                { new: true }
            );

            res.status(200).json({
                message: "Product updated successfully",
                data: updatedProduct,
            });

        } catch (error) {
            console.error("Update Product Error:", error);
            res.status(500).json({ message: "Failed to update product", error: error.message });
        }
    });
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            data: deletedProduct
        });
    } catch (error) {
        console.error("Delete product error:", error);
        res.status(500).json({
            message: "Failed to delete product",
            error: error.message
        });
    }
};


const getTotalProductCountByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const count = await productModel.countDocuments({ userId });
        res.status(200).json({
            message: "Total number of products by user",
            total: count
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to get product count",
            error: err.message
        });
    }
};


module.exports = {
    addProduct,
    getAllProduct,
    addProductWithFile,
    getAllProductByUserId,
    getProductById,
    getProductsByCategoryId,
    getTotalProductCount,
    updateProduct,
    deleteProduct,
    getTotalProductCountByUser
}