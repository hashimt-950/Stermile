import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { toast } from "react-toastify";

function Login({setUser}) {

        const [email , setEmail] = useState('')
        const [password, setPassword] = useState('')
        const navigate = useNavigate()


        
        const login = async () => {

            try {
                const res = await authService.LoginIn({email, password})
                if(res) {
                    toast.success("Login Successful")
                    const currentUser = await authService.GetCurrentUser();
                    setUser(currentUser)
                    navigate('/dashboard', { replace: true });
                    
                }

            } catch (error) {
                toast.error("Invalid Email or Password")
            }
        }


    return(

        <div className="text-center">
            <h1 className="logo">
                <span className="Watch">Watch</span>
                <span className="Buddy">Buddy</span>
            </h1>

            <h2 className="welcome">Welcome to WatchBuddy</h2>

            <div className="loginCred-container">
                <div className="input-container">
                    <input onChange={(e) => {
                        setEmail(e.target.value)
                    }} value={email} type="email" placeholder="Enter your email" className="credInput"/>
                </div>

                <div className="input-container">
                    <input onChange={(e) => {
                        setPassword(e.target.value)
                    }} value={password} type="password" placeholder="password" className="credInput"/>
                </div>

                <h6 className="forgot-password">Forgot password?</h6>

            </div>



            <div className="loginSignupBtn-container text-center">
                <button className="loginSignupBtn" onClick={login}>Login</button>
            </div>

            <div className="d-flex justify-content-center align-items-center signupLogin-link-container my-5">
                <h6 className="signupLogin-link-text">new to WatchBuddy?</h6>
                <Link className="signupLogin-link" to="/signup">Create Account</Link>
            </div>

        </div>
    )
       

}

export default Login