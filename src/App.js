import ScrollToTop from './Components/ScrollToTop';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import { HashRouter as Router } from "react-router-dom";
import AnimatedRoutes from './Components/AnimatedRoutes';

function App() {
  
  return (
    <div>
      <Router>
        <ScrollToTop/>
        <Navbar/>
        <AnimatedRoutes/>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;