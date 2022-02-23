import {Routes , useLocation ,Route} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// pages 
import Index from './pages/index'
import CreatAGame from './pages/Game/Create'
import GameLobby from './pages/Game/Lobby'

const Urls = () => {
    const location = useLocation();
    return(
        <AnimatePresence exitBeforeEnter={true}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Index />}></Route>
            <Route path="/Game" element={<CreatAGame />}></Route>
            <Route path="/Game/:gid" element={<GameLobby />}></Route>
          </Routes>
        </AnimatePresence>)
};

export default Urls;