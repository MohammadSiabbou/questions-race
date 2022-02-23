import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { query, collection, getDocs, getFirestore, where, addDoc } from 'firebase/firestore';

const UserDataCard = ({ user }) => {
    const [IsLoading, setIsLoading] = useState(true);
    const [FullData, setFullData] = useState(true);
    const db = getFirestore();
    const UserSCollectionRef = collection(db, 'users');
    useEffect(() => {
        getuser();
    }, []);
    async function getuser() {
        const q = query(UserSCollectionRef, where("google_id", '==', user.uid));
        const olddata = await getDocs(q);
        olddata.docs.map((doc) => {
            return setFullData({ ...doc.data(), id: doc.id });
        });
    }
    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }
    return (
        <div className="text-center p-5 rounded">
            <img className="h-20 w-20 rounded-full m-auto" src={FullData.avatar} />
            <p className="text-gray-400 text-xl mt-2">{FullData.name}</p>
            <span className="text-gray-300 text-sm">{timeConverter(user.joinedat)}</span>
        </div>
    );
};

export default UserDataCard;
