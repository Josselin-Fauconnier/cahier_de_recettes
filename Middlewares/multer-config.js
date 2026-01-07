const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
    'image/jpeg': 'jpg',
    'image/webp': 'webp',
    'image/avif': 'avif'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.')[0];
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');
