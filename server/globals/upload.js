const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_CLOUDINARY_KEY,
    api_secret: process.env.API_CLOUDINARY_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'LUG_IMG',
    },
});

const upload = multer({ storage: storage });

module.exports = upload;