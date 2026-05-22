import React from "react";
import Navbar from "./Nabar/Navbar";
import { Outlet } from "react-router-dom";

function Private({setUser}) {
 

    return(
        <div className="private">
            <Navbar setUser={setUser}/>
            <Outlet />
        </div>
    )
}


export default Private