import { Route, Routes } from "react-router-dom";
import Carosal from "./components/Carosal";
import FAQ from "./components/FAQ";
import Nav from "./components/Nav";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import Astrology from "./pages/Astrology";
import Footer from "./components/Footer";
import Vastu from "./pages/Vastu";
import Numerology from "./pages/Numrology";
import RegistrationForm from "./pages/Registration";
import LoginForm from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Invoice from "./pages/Invoice";
import Cart from "./pages/Cart";
import CartManager from "./pages/ParentCard";
function App() {
  return (
    <div className="font-bold">
     <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/astrology' element={<Astrology/>}/>
        <Route path='/vastu' element={<Vastu/>}/>
        <Route path='/numerology' element={<Numerology/>}/>
        <Route path='/register' element={<RegistrationForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path='/invoice' element={<Invoice/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/cart-manegar" element={<CartManager/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
