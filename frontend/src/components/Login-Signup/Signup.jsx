import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { toast } from "react-toastify";

function Signup({setUser}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const signup = async () => {
        try {
            const res = await authService.SignUp({ email, password, name})
            if(res) {
                toast.success("Account Created Loggin In")
                const currentUser = await authService.GetCurrentUser();
                setUser(currentUser)
                navigate('/dashboard')
            }
        } catch (error) {
            toast.error("Opps!! unable to create account")
        }
    }

    return(

        <div className="text-center">
            <h1 className="logo">
                <span className="Watch">Watch</span>
                <span className="Buddy">Buddy</span>
            </h1>

            <h2 className="welcome">Welcome to WatchBuddy</h2>

            <div>
                <div className="input-container">
                    <input onChange={(e) => {
                        setName(e.target.value)
                    }} value={name} type="text" placeholder="Name" className="credInput" />
                </div>

                <div className="input-container">
                    <input onChange={(e) => {
                        setEmail(e.target.value)
                    }} value={email} type="email" placeholder="Email" className="credInput" />
                </div>

                <div className="input-container">
                    <input onChange={(e) => {
                        setPassword(e.target.value)
                    }} value={password} type="password" placeholder="password"  className="credInput"/>
                </div>
            </div>




            <h6 className="forgot-password">Forgot password?</h6>

            <div className="loginSignupBtn-container text-center">
                <button className="loginSignupBtn" onClick={signup}>Signup</button>
            </div>


            <div className="d-flex justify-content-center align-items-center signupLogin-link-container my-4">
                <h6 className="signupLogin-link-text">Already have an account?</h6>
                <Link className="signupLogin-link" to="/login">Login</Link>
            </div>


        </div>
    )
       

}

export default Signup