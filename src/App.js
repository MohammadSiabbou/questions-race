import logo from './logo.svg';
import './assets/css/App.css';
import react from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseapp } from './FirebaseSetup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BottomCurve from './assets/images/index-curve.svg'

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [currentuser, setcurrentuser] = react.useState(getAuth().currentUser);
  const signInWithGoogle = () => {
    if (currentuser) return console.log(auth.currentUser);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        toast.success("Welcome " + user.displayName);
        localStorage.setItem('token', token);
        setcurrentuser(auth.currentUser);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error("Can't sign in with Google please try again ");
      });
  }
  return (
    <div className="h-screen bg-default-bg">
      <img src={BottomCurve} className="fixed bottom-0 left-0 z-0" />
      <ToastContainer />
      <button className="bg-primary hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded-full absolute top-2 right-2" onClick={signInWithGoogle}>{currentuser !== null ? currentuser.displayName : "Sign In"}</button>
      <div className="grid items-center text-center content-center h-screen z-40 relative">
        <div className="p-2 w-screen lg:w-1/2 m-auto">
          <h2 className="text-5xl text-white font-bold mb-5">Welcome to <span className="text-secondary">Questions Race</span></h2>
          <p className="text-white">The discription should be here Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam eius sed odit fugiat iusto fu</p>
            <button className="bg-primary hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded-full mt-5 cursor-pointer" onClick={signInWithGoogle}>{currentuser !== null ? "Creat A New Private Game" : "Sign In To Creat a New Game"}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
