const express = require('express');
const router = express.Router();
const authController = require("../controllers/AuthController");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '../uploads');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });


// Route for user registration
router.post('/signup',upload.single('image'), authController.registerUser);

router.post('/login', authController.loginUser);


module.exports = router;
