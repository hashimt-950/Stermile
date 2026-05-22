import React from "react";
import { useNavigate } from "react-router-dom";
import authService from '../../appwrite/auth'

function Logout({setUser}) {
           const navigate = useNavigate()



    const logout = async () => {
        
        try {
            await authService.LogOut()
                setUser(null)
                navigate('/login', { replace: true })

        } catch (error) {
            throw error
        }
    }

    return(
        <button className="logout" onClick={logout}>Logout</button>
    )
}

export default Logout