import { Route, Routes } from "react-router-dom";
import Carosal from "./components/Carosal";
import FAQ from "./components/FAQ";
import Nav from "./components/Nav";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
function App() {
  return (
    <div className="font-bold">
     <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
