import React from "react";

const Index = () => {
    return (<div className="grid items-center text-center content-center h-screen z-40 relative">
        <div className="p-4 w-screen lg:w-1/2 m-auto">
            <h2 className="text-5xl text-white font-bold mb-5">Welcome to <span className="text-secondary">Questions Race</span></h2>
            <p className="text-white">The discription should be here Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fu</p>
            <button className="bg-primary hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded-full mt-5 cursor-pointer">Creat A New Private Game</button>
        </div>
    </div>)
};

export default Index;