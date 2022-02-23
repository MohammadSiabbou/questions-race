import react, { useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseapp } from '../FirebaseSetup';
import { ToastContainer, toast } from 'react-toastify';
import { query, collection, getDocs, getFirestore, where, addDoc } from 'firebase/firestore';

const SignInButton = () => {
    const db = getFirestore();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const UserSCollectionRef = collection(db, 'users');
    const [currentuser, setcurrentuser] = react.useState('loading');
    const signInWithGoogle = () => {
        if (currentuser) {
            getAuth().signOut();
            setcurrentuser(null);
            return true;
        }
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

    useEffect(() => {
        // call it once
        auth.onAuthStateChanged(function (user) { // storing the user when the auth state changes
            if (user) {
                setcurrentuser(getAuth().currentUser);
                checkUser();
            } else {
                setcurrentuser(null);
            }
        });
    }, []);


    async function checkUser() {
        var user = [];
        const q = query(UserSCollectionRef, where("google_id", '==', getAuth().currentUser.uid));
        const olddata = await getDocs(q);
        olddata.docs.map((doc) => {
            return user.push({ ...doc.data(), id: doc.id });
        });
        if (user.length <= 0) { // save the user to database if he is new
            await addDoc(UserSCollectionRef,
                {
                    google_id: getAuth().currentUser.uid,
                    name: getAuth().currentUser.displayName,
                    avatar: getAuth().currentUser.photoURL,
                });
        }
    }
    return (<button className="bg-primary hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded-full absolute top-2 right-2 cursor-pointer z-50" onClick={signInWithGoogle}>{currentuser !== 'loading' ? (currentuser !== null ? currentuser.displayName + " (sign out)" : "Sign In") : "Loading..."}</button>)
}

export default SignInButton;