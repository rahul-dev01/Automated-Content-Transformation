import React, { useState } from 'react';
import Result from '../components/Result';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", selectedFile);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${BASE_URL}/cattle/predict`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data && data.breed) {
        setResult(data);
      } else {
        alert(data.error || "Failed to get prediction");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error in image submission. Please make sure both backends are running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            AI-Powered Analysis
          </div>
          <h1 className="text-5xl font-black text-white mb-6 tracking-tight">
            Identify Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Cattle</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Upload a clear photo of your cattle and our advanced neural network will identify the breed with professional accuracy.
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10">
          <div className="p-10 sm:p-16">
            {!previewUrl ? (
              <div
                className={`relative group transition-all duration-300 ${isDragging ? 'scale-[1.02]' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <label className={`flex flex-col items-center justify-center w-full h-96 border-4 border-dashed rounded-[2.5rem] cursor-pointer transition-all duration-500 ${isDragging ? 'border-amber-500 bg-amber-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-500/30'}`}>
                  <div className="flex flex-col items-center justify-center text-center px-6">
                    <div className={`bg-amber-500/10 backdrop-blur-xl p-8 rounded-3xl mb-8 transition-all duration-500 group-hover:scale-110 ${isDragging ? 'scale-110 shadow-amber-500/20' : ''}`}>
                      <svg className={`w-14 h-14 transition-colors duration-500 ${isDragging ? 'text-amber-400' : 'text-amber-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Click or drag image to upload</h3>
                    <p className="text-slate-400 font-medium mb-2">Support JPG, PNG, JPEG up to 10MB</p>
                    <div className="flex gap-2 mt-4">
                      <span className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold text-slate-400 border border-white/10">Side View</span>
                      <span className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold text-slate-400 border border-white/10">Front View</span>
                      <span className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold text-slate-400 border border-white/10">Clear Lighting</span>
                    </div>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
              </div>
            ) : (
              <div className="space-y-10">
                <div className="relative rounded-[2.5rem] overflow-hidden group shadow-2xl">
                  <Result
                    previewUrl={previewUrl}
                    result={result}
                    removeImage={removeImage}
                  />
                </div>

                {!result && (
                  <button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className={`w-full group relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-black py-6 rounded-2xl shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-4 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 border-4 border-slate-900/20 border-t-slate-900 rounded-full animate-spin"></div>
                        <span className="text-xl">AI analyzing image...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xl">Start Classification</span>
                        <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: 'Clear Quality', desc: 'Ensure the photo is sharp and well-lit' },
            { title: 'Full Body', desc: 'Capture the full body or clear head profile' },
            { title: 'Single Animal', desc: 'Avoid multiple animals in one photo' }
          ].map((tip, i) => (
            <div key={i} className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex items-start gap-4 hover:border-amber-500/30 transition-colors">
              <div className="bg-amber-500/10 p-3 rounded-xl">
                <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{tip.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upload;
