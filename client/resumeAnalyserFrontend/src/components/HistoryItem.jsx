import React from 'react'

const HistoryItem = ({ result }) => {
    const formattedDate = new Date(result.analyzedAt).toLocaleDateString();

    return (
        <div className="border p-4 rounded shadow-md bg-white space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Analysis from {formattedDate}</h3>
                <span className="font-bold text-blue-600">{result.score}%</span>
            </div>

            {/* Missing Keywords Preview */}
            {result.missingKeywords?.length > 0 && (
                <div>
                    <h4 className="text-sm font-semibold text-gray-500">Missing Keywords:</h4>
                    <div className="flex gap-2 flex-wrap mt-1">
                        {result.missingKeywords.slice(0, 3).map((kw, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">
                                {kw}
                            </span>
                        ))}
                        {result.missingKeywords.length > 3 && (
                            <span className="text-xs text-gray-500">+{result.missingKeywords.length - 3} more</span>
                        )}
                    </div>
                </div>
            )}

            {/* Suggestions Preview */}
            {result.suggestions?.length > 0 && (
                <div>
                    <h4 className="text-sm font-semibold text-gray-500">Suggestions:</h4>
                    <ul className="list-disc pl-5 text-gray-700 text-sm mt-1">
                        {result.suggestions.slice(0, 2).map((s, index) => (
                            <li key={index}>{s}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default HistoryItem
