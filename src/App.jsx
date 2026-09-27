import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Cartprovider from "./context/CartContext";
import Checkout from "./pages/Checkout/Checkout";
import NavBar from "./components/Navbar/Navbar";
import AuthProvider from "./context/AuthContext";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import './App.css';




function App() {

  return (
    <AuthProvider>
      <Cartprovider>
      
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element ={<Auth /> }/>
        <Route path="/checkout" element ={<Checkout />} />
        <Route path="/products/:id" element ={<ProductDetail />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />

      </Routes>
    </div>
    </Cartprovider>
    </AuthProvider>
  )
}

export default App
