const express = require('express');
const multer = require('multer');
const resumeController = require('../controllers/resumeController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

router.post("/analyse", authMiddleware, upload.single("resume"), resumeController.analyseResume);
router.get("/history", authMiddleware, resumeController.getHistory);

module.exports = router;