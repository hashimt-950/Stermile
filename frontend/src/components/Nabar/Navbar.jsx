import React from "react";
import Logout from "../Logout/Logout";
import { NavLink } from "react-router-dom";

function Navbar({setUser}){
    return(
            <nav className="navbar navbar-expand-lg navbar-dark nav-bg">
                <div className="container-fluid">
                    <NavLink className="navbar-brand navbar-logo" to="/">
                        <span className="Watch">Watch</span><span className="Buddy">Buddy</span>
                    </NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-5">
                            <li className="nav-item mx-2"><NavLink className="nav-link " to="home">Home</NavLink> </li>
                            <li className="nav-item mx-2 "><NavLink className="nav-link" to="watchlist">Watchlist</NavLink> </li>
                            {/* <li className="nav-item mx-2"><NavLink className="nav-link" to="friends">Friends</NavLink> </li> */}
                            <li className="nav-item mx-2"><NavLink className="nav-link" to="search">Search</NavLink> </li>
                        </ul>

                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item "> <Logout setUser={setUser}/> </li>
                        </ul>
                    </div>

                </div>
            </nav>

    )
}

export default Navbar