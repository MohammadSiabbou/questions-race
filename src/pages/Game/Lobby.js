import { useEffect, useState, Fragment } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { firebaseapp } from '../../FirebaseSetup';
import '@material/circular-progress/dist/mdc.circular-progress.css';
import { CircularProgress } from '@arterial/circular-progress';
import UserDataCard from '../../components/User-Data-Card';
import { useParams } from "react-router-dom";
import { query, onSnapshot, collection, doc, arrayUnion, getFirestore, where, addDoc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { motion } from 'framer-motion';

const GameLobby = () => {
    const [loading, setloading] = useState(false);
    const [JoiningUsers, setJoiningUsers] = useState([]);
    const [ids, setids] = useState([]);
    const [isHost, setisHost] = useState(false);
    const db = getFirestore();
    let { gid } = useParams();
    let navigate = useNavigate();
    const currentGame = doc(db, 'games', gid);

    useEffect(() => {
        if (JoiningUsers.length > 0) {
            setloading(false)
        } else {
            setloading(true)
        }
    }, [JoiningUsers]);


    const joinnewuser = async () => {
        console.log("one");
        ids.push(getAuth().currentUser.uid);
        setids(ids);
        await updateDoc(currentGame, {
            joinedusers: arrayUnion({
                uid: getAuth().currentUser.uid,
                isHost: false,
                joinedat: new Date().getTime()
            })
        });
    }

    useEffect(() => {
        onSnapshot(currentGame, (querySnapshot) => {
            console.log(querySnapshot.data().joinedusers);
            if (querySnapshot.data().joinedusers.length > 0) {
                var newusers = [];
                var ids = [];
                var localIsHost = false;
                querySnapshot.data().joinedusers.map((user) => {
                    if (user.uid == getAuth().currentUser.uid && !localIsHost) {
                        if (user.isHost) {
                            localIsHost = true;
                            setisHost(true);
                        }
                    }
                    ids.push(user.uid);
                    return newusers.push(user);
                });
                if (!ids.includes(getAuth().currentUser.uid)) {
                    joinnewuser();
                }
                newusers.sort((a, b) => (a.isHost > b.isHost) ? 1 : ((b.isHost > a.isHost) ? -1 : 0));
                setJoiningUsers(newusers);
                setids(ids);
            }
        });
    }, []);

    if (gid == undefined || gid == null) {
        navigate('/');
        return "error";
    }

    const StartTheGame = async () => {
        await updateDoc(currentGame, { status: "started" });
    };

    return (
        <div className="grid items-center text-center content-center h-screen z-40 relative">
            <div className="p-5 m-auto w-full">
                <h2 className="text-white text-4xl font-bold">Waitng For <span className="text-secondary">{isHost ? "Players" : "Host"}</span> !</h2>
                <p className="mt-1 text-white">The Game Will Start Automatically when the number of players is //max
                    <br /> or when you choose to start it (two players at least)</p>
                {(isHost && JoiningUsers.length > 0) && <motion.button whileTap={{ scale: 0.8 }} onClick={StartTheGame} className="bg-primary hover:bg-secondary-700 text-white mt-5 font-bold py-2 px-4 rounded-full cursor-pointer z-50"> Start The Game </motion.button>}
                {loading && <CircularProgress className="mt-3" />}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 overflow-auto">
                    {(JoiningUsers.length > 0) && (
                        JoiningUsers.map((user, ind) => (
                            <UserDataCard key={ind} user={user} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default GameLobby;