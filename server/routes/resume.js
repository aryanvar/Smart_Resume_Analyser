const express = require('express');
const multer= require ('multer');
const {analyseResume , getHistory} = require('../controllers/resumeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

router.post("/analyse",authMiddleware,upload.single("resume"), analyseResume);

router.get("/history", authMiddleware, getHistory);