const cloudinary = require('cloudinary').v2;

cloudinary.config({
        cloud_name: "djf70jh03",
        api_key: "869116472876523",
        api_secret: "RuHshYyRomiPnKOJyBWzBUrYaMc"
    });
module.exports = cloudinary;


const UploadFileToCloudinary = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error("No file found");
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(filePath);
        return cloudinaryResponse;
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: err.message,
        };
    }
};

module.exports = {
    UploadFileToCloudinary
};
