import React, { useState } from 'react'
import { analyzeResume } from '../services/api';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [jd, setJd] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('jobDescription', jd);
        const { data } = await analyzeResume(formData);
        setResult(data);
    };
    return (
        <div className='space-y-6'>
            <input type="file" accept='.pdf' onChange={(e) => setFile(e.target.files[0])} className='w-full border p-2 rounded h-40' />
            <textarea value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Paste Job Description here..." className="w-full border p-2 rounded h-40" />
            <button onClick={handleSubmit} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Analyze</button>
            {result && (
                <div className="p-4 borde3r rounded mt-6">
                    <h3 className='text-xl font-bold' >Match Score : {result.score} %</h3>
                    <h4 className="font-semibold mt-3">Missing Keywords:</h4>
                    <ul className="list-disc pl-5 text-red-500">
                    {result.missingKeywords.map((kw, i) => <li key={i}>{kw}</li>)}
                    </ul>
                    <h4 className="font-semibold mt-3">Suggestions:</h4>
                    <ul className="list-disc pl-5 text-green-600">
                    {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default UploadForm
