import {BrowserRouter,Routes , useLocation ,Route} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// pages 
import Index from './pages/index'
import CreatAGame from './pages/Game/Creat'

const Urls = () => {
    const location = useLocation();
    return(
        <AnimatePresence exitBeforeEnter={true}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Index />}></Route>
            <Route path="/Game" element={<CreatAGame />}></Route>
            <Route path="/Game/:gid" element={<h3>HH</h3>}></Route>
          </Routes>
        </AnimatePresence>)
};

export default Urls;