import react from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseapp } from '../FirebaseSetup';
import { ToastContainer, toast } from 'react-toastify';

const SignInButton = () => {
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
    return (<button className="bg-primary hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded-full absolute top-2 right-2 cursor-pointer z-50" onClick={signInWithGoogle}>{getAuth().currentUser !== null ? getAuth().currentUser.displayName : "Sign In"}</button>)
}

export default SignInButton;