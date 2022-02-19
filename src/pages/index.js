import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Index = () => {
    const animations = {
        'show': {
            y: 0,
            opacity: 1
        },
        'hidden': {
            y: '-15vw',
            opacity: 0,
        },
        'transition': { type: 'tween', duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
    };
    let navigate = useNavigate();
    return (<React.Fragment>
        <motion.div transition={animations.transition} exit={{ y : '-20vw' , opacity : 0 }} className="grid items-center text-center content-center h-screen z-40 relative">
            <div className="p-4 w-screen lg:w-1/2 m-auto">
                <motion.h2 initial={animations.hidden} transition={{ ...animations.transition, ...{ 'delay': 0.3 } }} animate={animations.show} className="text-5xl text-white font-bold mb-5">Welcome to <span className="text-secondary">Questions Race</span></motion.h2>
                <motion.p initial={animations.hidden} transition={{ ...animations.transition, ...{ 'delay': 0.2 } }} animate={animations.show} className="text-white">The discription should be here Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fu</motion.p>
                <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-primary hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded-full mt-5 cursor-pointer" onClick={() => { navigate('Game'); }}>Creat A New Private Game</motion.button>
            </div>
        </motion.div>
    </React.Fragment>)
};

export default Index;