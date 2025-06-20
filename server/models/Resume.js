const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    originalFilename: {
        type: String,
    },
    resumeText: {
        type: String,
    },
    jobDescription: String,
    analysisResult: Object,
    analyzedAt: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model("Resume", ResumeSchema);