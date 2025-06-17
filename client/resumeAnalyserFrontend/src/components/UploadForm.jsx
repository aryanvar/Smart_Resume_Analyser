import React, { useState } from 'react'
import { analyzeResume } from '../services/api';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [jd, setJd] = useState('');
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('jobDescription', jd);
            const { data } = await analyzeResume(formData);
            setResult(data);
        } catch (error) {
            console.error('Analysis failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreBgColor = (score) => {
        if (score >= 80) return 'bg-green-100 border-green-200';
        if (score >= 60) return 'bg-yellow-100 border-yellow-200';
        return 'bg-red-100 border-red-200';
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8'>
            <div className='max-w-4xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4'>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>Resume Analyzer</h1>
                    <p className='text-gray-600 text-lg'>Upload your resume and job description to get an instant match analysis</p>
                </div>

                {/* Main Form Card */}
                <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8 mb-8'>
                    <form onSubmit={handleSubmit} className='space-y-8'>
                        {/* File Upload Section */}
                        <div className='space-y-3'>
                            <label className='text-lg font-semibold text-gray-800 block'>Upload Resume</label>
                            <div className='relative'>
                                <input 
                                    type="file" 
                                    accept='.pdf' 
                                    onChange={(e) => setFile(e.target.files[0])} 
                                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
                                    required
                                />
                                <div className={`w-full h-32 md:h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                                    file 
                                        ? 'border-green-400 bg-green-50' 
                                        : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                                }`}>
                                    {file ? (
                                        <div className='text-center'>
                                            <svg className="w-12 h-12 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className='text-green-700 font-medium'>{file.name}</p>
                                            <p className='text-green-600 text-sm'>File selected successfully</p>
                                        </div>
                                    ) : (
                                        <div className='text-center'>
                                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <p className='text-gray-600 font-medium'>Click to upload your resume</p>
                                            <p className='text-gray-500 text-sm'>PDF files only</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Job Description Section */}
                        <div className='space-y-3'>
                            <label className='text-lg font-semibold text-gray-800 block'>Job Description</label>
                            <div className='relative'>
                                <textarea 
                                    value={jd} 
                                    onChange={(e) => setJd(e.target.value)} 
                                    placeholder="Paste the complete job description here..."
                                    className="w-full h-32 md:h-40 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
                                    required
                                />
                                <div className='absolute bottom-3 right-3 text-xs text-gray-500'>
                                    {jd.length} characters
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            disabled={!file || !jd.trim() || isLoading}
                            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                                !file || !jd.trim() || isLoading
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] shadow-lg hover:shadow-xl'
                            }`}
                        >
                            {isLoading ? (
                                <div className='flex items-center justify-center space-x-2'>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Analyzing Resume...</span>
                                </div>
                            ) : (
                                <div className='flex items-center justify-center space-x-2'>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span>Analyze Resume</span>
                                </div>
                            )}
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                {result && (
                    <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8 animate-fade-in'>
                        {/* Score Card */}
                        <div className={`rounded-xl p-6 mb-8 border-2 ${getScoreBgColor(result.score)}`}>
                            <div className='text-center'>
                                <h3 className='text-2xl md:text-3xl font-bold mb-2'>Match Score</h3>
                                <div className={`text-5xl md:text-6xl font-bold ${getScoreColor(result.score)} mb-2`}>
                                    {result.score}%
                                </div>
                                <p className='text-gray-600'>
                                    {result.score >= 80 && "Excellent match! Your resume aligns well with the job requirements."}
                                    {result.score >= 60 && result.score < 80 && "Good match! Consider the suggestions below to improve."}
                                    {result.score < 60 && "Room for improvement. Focus on the missing keywords and suggestions."}
                                </p>
                            </div>
                        </div>

                        <div className='grid md:grid-cols-2 gap-8'>
                            {/* Missing Keywords */}
                            <div className='bg-red-50 rounded-xl p-6 border border-red-200'>
                                <div className='flex items-center mb-4'>
                                    <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <h4 className="text-xl font-bold text-red-700">Missing Keywords</h4>
                                </div>
                                <div className='space-y-2'>
                                    {result.missingKeywords.map((kw, i) => (
                                        <div key={i} className='bg-white/60 rounded-lg p-3 border border-red-200'>
                                            <span className='text-red-700 font-medium'>{kw}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Suggestions */}
                            <div className='bg-green-50 rounded-xl p-6 border border-green-200'>
                                <div className='flex items-center mb-4'>
                                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    <h4 className="text-xl font-bold text-green-700">Suggestions</h4>
                                </div>
                                <div className='space-y-3'>
                                    {result.suggestions.map((s, i) => (
                                        <div key={i} className='bg-white/60 rounded-lg p-3 border border-green-200'>
                                            <div className='flex items-start space-x-2'>
                                                <div className='w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0'></div>
                                                <span className='text-green-700'>{s}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Background Decorative Elements */}
                <div className='fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10'>
                    <div className='absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-xl'></div>
                    <div className='absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-400/10 rounded-full blur-xl'></div>
                    <div className='absolute top-1/2 right-1/3 w-24 h-24 bg-purple-400/10 rounded-full blur-xl'></div>
                </div>
            </div>
        </div>
    )
}

export default UploadForm