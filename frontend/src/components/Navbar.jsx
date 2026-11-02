import { useState } from 'react'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../redux/authSlice"
import logo from "../assets/logo/mainlogo.gif"

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        setMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-[100] bg-slate-900/80 backdrop-blur-lg border-b border-white/5 px-4 sm:px-8 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex gap-3 items-center group">
                    <div className="group-hover:rotate-12 transition-transform duration-300">
                        <img className="w-10 h-10 object-contain" src={logo} alt="Logo" />
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter">
                        <span className="text-amber-500">Cattle</span>
                        <span className="text-white">Breed</span>
                    </h1>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <ul className='flex gap-8 items-center text-sm font-bold text-slate-300'>
                        <li><Link to="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
                        <li><Link to="/upload" className="hover:text-amber-500 transition-colors">Upload</Link></li>
                        <li><Link to="/history" className="hover:text-amber-500 transition-colors">History</Link></li>
                        <li><Link to="/help" className="hover:text-amber-500 transition-colors">Help</Link></li>
                    </ul>

                    <div className="h-6 w-px bg-white/10 mx-2"></div>

                    {!isLoggedIn ? (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-sm font-bold text-white hover:text-amber-500 transition-colors">Login</Link>
                            <Link to="/signup" className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-amber-900/20">
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 font-black text-xs">
                                    {user?.name?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <span className="text-sm font-bold text-white">{user?.name || 'User'}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-bold text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button 
                    className="md:hidden p-2 text-white hover:bg-white/5 rounded-xl transition-colors"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/5 transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 space-y-6">
                    <ul className='space-y-4'>
                        <li><Link to="/" className="block text-lg font-bold text-slate-300 hover:text-amber-500" onClick={() => setMenuOpen(false)}>Home</Link></li>
                        <li><Link to="/upload" className="block text-lg font-bold text-slate-300 hover:text-amber-500" onClick={() => setMenuOpen(false)}>Upload</Link></li>
                        <li><Link to="/history" className="block text-lg font-bold text-slate-300 hover:text-amber-500" onClick={() => setMenuOpen(false)}>History</Link></li>
                        <li><Link to="/help" className="block text-lg font-bold text-slate-300 hover:text-amber-500" onClick={() => setMenuOpen(false)}>Help</Link></li>
                    </ul>
                    
                    <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                        {!isLoggedIn ? (
                            <>
                                <Link to="/login" className="text-center py-3 text-lg font-bold text-white" onClick={() => setMenuOpen(false)}>Login</Link>
                                <Link to="/signup" className="bg-amber-600 text-center py-4 rounded-2xl text-lg font-bold text-white" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="bg-red-600/10 text-red-500 py-4 rounded-2xl text-lg font-bold"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
