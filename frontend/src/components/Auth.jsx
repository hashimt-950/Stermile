import React from "react";
import Illustration from "./Illustration/Illustration";
import { Outlet } from "react-router-dom";

function Auth() {
    return(
        <div className="container-fluid auth">
            <div className="row">
                <div className="col-sm-12 col-lg-6 p-0">
                    <Illustration />
                </div>

                <div className="col-sm-12 col-lg-6 d-flex justify-content-center ">
                    <Outlet />
                </div>
            </div>
        </div>

    )
}

export default Auth