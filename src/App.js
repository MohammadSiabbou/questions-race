import './assets/css/App.css';
import react from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BottomCurve from './assets/images/index-curve.svg'
import { getAuth } from 'firebase/auth';
import { firebaseapp } from './FirebaseSetup';
import SignInButton from './components/Sign-In-Button';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
// pages 
import Index from './pages/index'

const App = () => {
  return (
    <div className="h-screen bg-default-bg">
      <img src={BottomCurve} className="fixed bottom-0 left-0 z-0" />
      <ToastContainer />
      <SignInButton />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
