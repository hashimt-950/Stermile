import React from "react";
import { Navigate } from "react-router-dom";

function Protected({user, children}){

    if (user === null) {
        return <div>Loading...</div>
    }

    if(!user){
        return <Navigate to="/login"/>
    }
    
    return children
}


export default Protected