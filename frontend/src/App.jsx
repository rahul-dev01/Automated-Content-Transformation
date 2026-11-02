import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomeScreen from "./screen/HomeScreen";
import Login from "./screen/Login";
import Upload from "./screen/Upload";
import History from "./screen/History";
import Help from "./screen/Help";
import SignUp from "./screen/SignUp";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/upload" element={isLoggedIn ? <Upload /> : <Navigate to="/login" />} />
            <Route path="/history" element={isLoggedIn ? <History /> : <Navigate to="/login" />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!isLoggedIn ? <SignUp /> : <Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;