const pdfParser = require('pdf-parse');
const axios = require('axios');
const Resume = require('../models/resume');

exports.analyseResume = async (req, res) => {
    try {
        const { jobDescription } = req.body;
        const resumeFile = req.file;
        
        if (!resumeFile || !jobDescription) {
            return res.status(400).json({ message: "Resume file and job description are required" });
        }
        
        const pdfData = await pdfParser(resumeFile.buffer);
        const resumeText = pdfData.text;
        
        // ✅ Fixed: Changed 'analysisResposne' to 'analysisResponse'
        const analysisResponse = await axios.post(process.env.NLP_SERVICE_URL, { 
            resumeText, 
            jobDescription 
        });
        
        const resume = new Resume({
            userId: req.user.id,
            originalFilename: resumeFile.originalname,
            resumeText,
            jobDescription,
            analysisResult: analysisResponse.data,
            analyzedAt: new Date(),
        });
        
        await resume.save();
        res.json(analysisResponse.data);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user.id }).sort({ analyzedAt: -1 });
        res.json(resumes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};