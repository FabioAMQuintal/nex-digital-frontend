import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../services";


const Logout: React.FC = () => {

    const navigate = useNavigate()
    const logout = () => {
        Auth.logout()
        navigate('/')
    }
    return (
        <Button variant="danger" onClick={logout}>Logout</Button>
    )
}

export default Logout;
