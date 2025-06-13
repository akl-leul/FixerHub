const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (!filetypes.test(ext)) return cb(new Error('Only PDF files allowed'));
    cb(null, true);
  }
});

module.exports = upload;