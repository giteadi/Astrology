import Carosal from "./components/Carosal";
import FAQ from "./components/FAQ";
import Nav from "./components/Nav";
import AboutUs from "./pages/AboutUs";
function App() {
  return (
    <div className="font-bold">
     <Nav/>
     <Carosal/>
     <AboutUs/>
     <FAQ/>
    </div>
  );
}

export default App;
