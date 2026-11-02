import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import googleLogo from "../assets/logo/google.gif"

const SignUp = () => {
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const handelSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrMessage('');

        if (password.length < 6) {
            setErrMessage("Password must be at least 6 characters long");
            setIsLoading(false);
            return;
        }

        const body = {
            first_name: firstName,
            last_name: lastName,
            email,
            password
        };

        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            const data = await response.json();

            if (response.ok) {
                navigate("/login")
            } else {
                setErrMessage(data?.message || "Sign Up failed")
            }
        } catch (error) {
            setErrMessage("Error while connecting to server")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='min-h-[calc(100vh-80px)] bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden'>
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className='bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[2.5rem] w-full max-w-lg overflow-hidden flex flex-col relative z-10'>
                <div className='p-10 text-center border-b border-white/5'>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        Join the community
                    </div>
                    <h1 className="text-4xl font-black text-white mb-3 tracking-tight">Create Account</h1>
                    <p className='text-slate-400 font-medium'>Start your journey in precision cattle identification</p>
                </div>

                <div className='p-10'>
                    <form onSubmit={handelSignUp} className='flex flex-col gap-6'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-xs font-bold text-slate-400 uppercase tracking-widest ml-1'>First Name</label>
                                <input 
                                    className="p-4 bg-slate-800/50 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all"
                                    type="text"
                                    placeholder='John'
                                    required
                                    value={firstName}
                                    onChange={(e) => setfirstName(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-xs font-bold text-slate-400 uppercase tracking-widest ml-1'>Last Name</label>
                                <input 
                                    className="p-4 bg-slate-800/50 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all"
                                    type="text"
                                    placeholder='Doe'
                                    required
                                    value={lastName}
                                    onChange={(e) => setlastName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-xs font-bold text-slate-400 uppercase tracking-widest ml-1'>Email Address</label>
                            <input 
                                className="p-4 bg-slate-800/50 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all"
                                type="email"
                                placeholder='john.doe@example.com'
                                required
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-xs font-bold text-slate-400 uppercase tracking-widest ml-1'>Password</label>
                            <input 
                                className="p-4 bg-slate-800/50 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all"
                                type="password"
                                placeholder='Minimum 6 characters'
                                required
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                        </div>

                        {errMessage && (
                            <div className='bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3'>
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <p className="text-red-400 text-sm font-semibold">{errMessage}</p>
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className={`w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-black py-4 rounded-2xl transition-all shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 mt-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </button>

                        <div className="relative my-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/5"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-[0.2em] font-black">
                                <span className="px-4 bg-slate-900/0 text-slate-500 backdrop-blur-sm">Or sign up with</span>
                            </div>
                        </div>

                        <button type="button" className='flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-4 rounded-2xl hover:bg-white/10 transition-all font-bold text-white'>
                            <img src={googleLogo} alt="Google logo" className="h-5 w-5" />
                            <span>Google Account</span>
                        </button>
                    </form>

                    <p className="text-center text-slate-400 mt-8 font-medium">
                        Already have an account?{" "}
                        <Link to="/login" className="text-amber-500 font-bold hover:text-amber-400 transition-colors">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
