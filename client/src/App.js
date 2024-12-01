import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
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
import AstrologyPage from "./pages/TrianglePage";
import NumrologyService from "./pages/SquareServicePage";
import ProductPage from "./pages/ProductPage";
import VastuPage from './pages/VastuPage'
import NumrologyPage from './pages/Numrology-Page';
import AstroPage2 from './pages/AstroPage'
function App() {
  return (
    <div className="font-bold">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/astrology-page/:id" element={<AstrologyPage/>}/>
        <Route path='/vastu' element={<Vastu/>}/>
        <Route path='/numerology' element={<Numerology/>}/>
        <Route path='/register' element={<RegistrationForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path='/invoice' element={<Invoice/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/cart-manegar" element={<CartManager/>}/>
        <Route path='/astrology/:id' element={<Astrology/>}/>
        <Route path='/vastu-page/:id' element={<VastuPage/>}/>
        <Route path='/numerology-page/:id' element={<NumrologyPage/>}/>
        <Route path='/numerologyPage' element={<NumrologyService/>}/>
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path='/astroSingle' element={<AstroPage2/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
