import { motion } from 'framer-motion';
import { useState, Fragment } from 'react';
import { firebaseapp } from '../../FirebaseSetup';
import { getFirestore } from "firebase/firestore"
import { collection, addDoc } from "firebase/firestore";
import '@material/circular-progress/dist/mdc.circular-progress.css';
import { CircularProgress } from '@arterial/circular-progress';
import { getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const CreatAGame = () => {
    let navigate = useNavigate();
    const [Loading, setLoading] = useState(false);
    const [Values, setValues] = useState({
        "max_players": "4",
        "time": "1:30"
    });
    const db = getFirestore();
    async function CreatTheGame() {
        try {
            setLoading(true);
            console.log();
            const docRef = await addDoc(collection(db, "/games"), {
                host: getAuth().currentUser.uid,
                created_at: new Date().getTime(),
                max_players: Values.max_players,
                time: Values.time,
                status: "pending",
                joinedusers: [{
                    uid: getAuth().currentUser.uid,
                    joinedat: new Date().getTime(),
                    isHost : true
                }]
            });
            console.log("Document written with ID: ", docRef.id);
            navigate('/Game/' + docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const handleChange = (e) => {
        setValues({ ...Values, [e.target.id]: e.target.value });
    }

    return (<motion.div initial={{ y: '20vw', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'tween', duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }} exit={{ y: '-20vw', opacity: 0 }} className="grid items-center text-center content-center h-screen z-40 relative p-5">
        <div className="p-5 m-auto w-full sm:w-1/2">
            <h2 className="text-white text-4xl font-bold">Creat A <span className="text-secondary">Game</span> !</h2>
            <p className="mt-1 text-white">Edit the settings bellow and click play to start the game </p>
            {/* settings form */}
            {Loading ? <div className="mt-5">
                <CircularProgress className="text-secondary" />
            </div>
                : <Fragment>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                        <div>
                            <label className="text-white float-left mb-1">Time :</label>
                            <input id="time" onChange={handleChange} className="bg-transparent p-4 w-full text-white outline-none border-2 border-white rounded-md" type="text" value={Values.time} placeholder="time (mm:ss)" />
                        </div>
                        <div>
                            <label className="text-white float-left mb-1">Max Players :</label>
                            <input id="max_players" onChange={handleChange} className="bg-transparent p-4 w-full text-white outline-none border-2 border-white rounded-md" type="number" max={10} value={Values.max_players} placeholder="Players" />
                        </div>
                    </div>
                    <motion.button whileTap={{ scale: 0.9 }} initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-primary hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded-full mt-5 cursor-pointer w-1/4" onClick={CreatTheGame} >Play !</motion.button>
                </Fragment>}
        </div>
    </motion.div>)
};

export default CreatAGame;