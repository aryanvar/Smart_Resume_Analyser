import React from 'react'

const ResultCard = ({ result }) => {
    return (
        <div className="border p-6 rounded shadow-lg bg-white space-y-4">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-blue-600">{result.score}% Match</h2>
            </div>

            {/* Missing Keywords */}
            {result.missingKeywords?.length > 0 && (
                <div>
                    <h3 className="font-semibold text-gray-700">Missing Keywords</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {result.missingKeywords.map((kw, index) => (
                            <span
                                key={index}
                                className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs"
                            >
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Suggestions */}
            {result.suggestions?.length > 0 && (
                <div>
                    <h3 className="font-semibold text-gray-700 mt-4">Suggestions to Improve</h3>
                    <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
                        {result.suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ResultCard
