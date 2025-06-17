import React from 'react'
import UploadForm from '../components/UploadForm'

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 transform transition-all duration-300 hover:shadow-xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
                    Upload Resume & Job Description
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                    <UploadForm />
                </div>
            </div>
        </div>
    )
}

export default Dashboard