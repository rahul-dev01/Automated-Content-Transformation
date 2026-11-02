import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import setting from "../assets/image/setting.gif";
import test from "../assets/image/test2.gif";
import mouse from "../assets/image/mouse.gif";
import camera from "../assets/image/camera.gif";
import ai from "../assets/image/ai.gif";
import result from "../assets/image/result.gif";

const HomeScreen = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleStart = () => {
        if (isLoggedIn) {
            navigate("/upload")
        } else {
            navigate("/login")
        }
    }

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-slate-900 text-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-900/40 via-slate-900 to-slate-900"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
                </div>
                
                <div className="relative max-w-5xl mx-auto text-center">
                    <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-amber-500 uppercase bg-amber-500/10 rounded-full border border-amber-500/20 backdrop-blur-sm animate-pulse">
                        Powered by Advanced AI
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8">
                        Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Cattle Breed</span> Identification
                    </h1>
                    <p className="text-xl sm:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Identify cattle breeds instantly with professional-grade accuracy. Join thousands of farmers using our cutting-edge neural network.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <button 
                            onClick={handleStart} 
                            className="group relative bg-amber-600 hover:bg-amber-500 text-white px-10 py-4 text-lg font-bold rounded-2xl shadow-[0_0_20px_rgba(217,119,6,0.3)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Get Started Now
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </button>
                        {!isLoggedIn && (
                            <button 
                                onClick={() => navigate('/signup')} 
                                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/50 text-white px-10 py-4 text-lg font-bold rounded-2xl transition-all duration-300 backdrop-blur-md cursor-pointer"
                            >
                                Create Account
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="py-24 px-4 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-amber-600 uppercase bg-amber-50 rounded-lg">
                            Core Benefits
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
                            Why Choose Our AI Classifier?
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                            We combine agricultural expertise with advanced machine learning to deliver results you can trust.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: setting,
                                title: 'Fast & Accurate',
                                desc: 'Our deep learning models provide over 95% accuracy in breed identification within milliseconds.',
                                gradient: 'from-amber-500 to-amber-600'
                            },
                            {
                                icon: test,
                                title: 'Detailed Insights',
                                desc: 'Get more than just a name. Learn about physical characteristics and historical origins.',
                                gradient: 'from-slate-800 to-slate-900'
                            },
                            {
                                icon: mouse,
                                title: 'User Friendly',
                                desc: 'Designed for everyone from professional farmers to livestock enthusiasts. No tech skills needed.',
                                gradient: 'from-amber-500 to-amber-600'
                            }
                        ].map((item, index) => (
                            <div key={index} className="group p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-amber-200 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500">
                                <div className={`bg-gradient-to-br ${item.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    <img src={item.icon} alt={item.title} className="h-8 w-8 brightness-0 invert" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
                            How It Works
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">Three simple steps to professional identification</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: camera,
                                title: 'Upload Photo',
                                desc: 'Take a clear side-view or front-view photo of the cattle and upload it.'
                            },
                            {
                                icon: ai,
                                title: 'AI Processing',
                                desc: 'Our neural network analyzes distinctive features like color, pattern, and morphology.'
                            },
                            {
                                icon: result,
                                title: 'Get Results',
                                desc: 'Receive instant classification along with detailed breed information and history.'
                            }
                        ].map((item, index) => (
                            <div key={index} className="relative group">
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-amber-500/50 to-transparent z-0 -translate-y-1/2"></div>
                                )}
                                <div className="relative z-10 bg-slate-800/50 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 hover:border-amber-500/30 transition-all duration-500 group-hover:-translate-y-2">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="bg-amber-500 text-slate-900 w-10 h-10 rounded-full flex items-center justify-center font-black text-lg">
                                            {index + 1}
                                        </div>
                                        <img src={item.icon} alt={item.title} className="h-16 w-16" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                    <p className="text-slate-400 leading-relaxed text-lg">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-5xl mx-auto bg-gradient-to-br from-amber-500 to-amber-700 rounded-[4rem] p-12 sm:p-20 text-center text-white shadow-[0_30px_60px_rgba(217,119,6,0.3)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-tight">
                            Ready to identify <br className="hidden sm:block" /> your cattle?
                        </h2>
                        <p className="text-xl sm:text-2xl text-amber-50 font-medium mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
                            Join our community of precision farmers and enthusiasts today. Get started for free.
                        </p>
                        <button 
                            onClick={handleStart} 
                            className="bg-white text-amber-600 px-14 py-5 text-xl font-black rounded-2xl shadow-2xl hover:bg-slate-900 hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            Start Classifying Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeScreen;
