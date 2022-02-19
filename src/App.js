import './assets/css/App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BottomCurve from './assets/images/index-curve.svg'
import { firebaseapp } from './FirebaseSetup';
import SignInButton from './components/Sign-In-Button';
import { AnimatePresence } from "framer-motion";
import Urls from './Routes';
import {BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div className="h-screen bg-default-bg">
      <img src={BottomCurve} className="fixed bottom-0 left-0 z-0" alt="..." />
      <ToastContainer />
      <SignInButton />
      <BrowserRouter>
        <Urls />
      </BrowserRouter>
    </div>
  );
}

export default App;
