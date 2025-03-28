const multer = require("multer");
const cloudinary = require("../config/cloudinary");

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadImages = async (req, res) => {
  try {
    let files = [];

    // If a single image is uploaded, convert it to an array for uniform handling
    if (req.file) {
      files = [req.file];
    } else if (req.files) {
      files = req.files;
    }

    if (files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Function to upload a single image to Cloudinary
    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "uploads" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(fileBuffer);
      });
    };

    // Upload all images
    const uploadPromises = files.map((file) => uploadToCloudinary(file.buffer));
    const uploadedUrls = await Promise.all(uploadPromises);
    res.status(200).json({ urls: uploadedUrls });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
};

// Export the middleware and controller
module.exports = {
  upload,
  uploadImages,
};
