import React from 'react';

const Result = ({ previewUrl, result, removeImage }) => {
    if (!previewUrl && !result) return null;

    const hasResult = result && result.breed;

    return (
        <div className="p-8 space-y-6">
            {previewUrl && (
                <div className="relative">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-contain max-h-96"
                    />
                    {hasResult && (
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-black px-5 py-2 rounded-full text-sm shadow-lg animate-bounce">
                            {result.confidence_percent}% Match
                        </div>
                    )}
                </div>
            )}

            <button
                onClick={removeImage}
                className="w-full bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-red-400 font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Upload New Image
            </button>

            {hasResult && (
                <div className="space-y-5">
                    <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/20">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-amber-500/20 p-3 rounded-xl">
                                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-amber-400 text-sm font-semibold uppercase tracking-wider">Predicted Breed</p>
                                <h3 className="text-2xl font-black text-white">{result.breed}</h3>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${result.animal_type === 'cattle' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                                {result.animal_type === 'cattle' ? '🐄 Cattle' : '🐃 Buffalo'}
                            </span>
                            <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-1000"
                                    style={{ width: `${result.confidence_percent}%` }}
                                />
                            </div>
                            <span className="text-amber-400 font-black">{result.confidence_percent}%</span>
                        </div>
                    </div>

                    {result.description && (
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Breed Description
                            </h4>
                            <p className="text-slate-300 leading-relaxed">{result.description}</p>
                        </div>
                    )}

                    {result.internet_details && (
                        <div className="bg-gradient-to-br from-violet-500/10 to-purple-600/5 backdrop-blur-xl rounded-2xl p-6 border border-violet-500/20">
                            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                About this Breed
                            </h4>
                            <p className="text-slate-300 leading-relaxed mb-4">{result.internet_details}</p>
                            {result.internet_source_url && (
                                <a
                                    href={result.internet_source_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-semibold transition-colors"
                                >
                                    Learn more from {result.internet_source_title || 'DuckDuckGo'}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    )}

                    {result.top_k && result.top_k.length > 1 && (
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Top Predictions
                            </h4>
                            <div className="space-y-3">
                                {result.top_k.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                                        <span className={`w-7 h-7 flex items-center justify-center rounded-full font-black text-sm ${index === 0 ? 'bg-amber-500 text-slate-900' : 'bg-white/10 text-slate-400'}`}>
                                            {index + 1}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.type === 'cattle' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                            {item.type}
                                        </span>
                                        <span className="flex-1 text-white font-semibold text-left">{item.breed}</span>
                                        <span className="text-amber-400 font-black">{item.confidence_percent}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {result.distribution && (
                        <div className="flex gap-4 justify-center">
                            <div className="bg-emerald-500/10 backdrop-blur-xl px-5 py-3 rounded-xl border border-emerald-500/20 flex items-center gap-2">
                                <span className="text-2xl">🐄</span>
                                <span className="text-emerald-400 font-bold">{result.distribution.cattle} Cattle</span>
                            </div>
                            <div className="bg-blue-500/10 backdrop-blur-xl px-5 py-3 rounded-xl border border-blue-500/20 flex items-center gap-2">
                                <span className="text-2xl">🐃</span>
                                <span className="text-blue-400 font-bold">{result.distribution.buffalo} Buffalo</span>
                            </div>
                        </div>
                    )}

                    {result.model_name && (
                        <p className="text-center text-slate-500 text-xs mt-4">
                            Model: {result.model_name} • {result.device}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Result;
