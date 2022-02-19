import './assets/css/App.css';
import react from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BottomCurve from './assets/images/index-curve.svg'
import { getAuth } from 'firebase/auth';
import { firebaseapp } from './FirebaseSetup';
import SignInButton from './components/Sign-In-Button';

const App = () => {
  return (
    <div className="h-screen bg-default-bg">
      <img src={BottomCurve} className="fixed bottom-0 left-0 z-0" />
      <ToastContainer />
      <SignInButton />
      <div className="grid items-center text-center content-center h-screen z-40 relative">
        <div className="p-2 w-screen lg:w-1/2 m-auto">
          <h2 className="text-5xl text-white font-bold mb-5">Welcome to <span className="text-secondary">Questions Race</span></h2>
          <p className="text-white">The discription should be here Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam eius sed odit fugiat iusto fu</p>
          <button className="bg-primary hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded-full mt-5 cursor-pointer">{getAuth().currentUser !== null ? "Creat A New Private Game" : "Sign In To Creat a New Game"}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
