import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import NavBar from "./components/Navbar/Navbar";
import AuthProvider from "./context/AuthContext";
import './App.css';


function App() {

  return (
    <AuthProvider>
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element ={<Auth /> }/>
        <Route path="/checkout" element ={<Checkout />} />
      </Routes>
    </div>
    </AuthProvider>
  )
}

export default App
