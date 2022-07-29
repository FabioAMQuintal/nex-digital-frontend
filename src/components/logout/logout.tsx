import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../services";


const Logout: React.FC = () => {

    const navigate = useNavigate()

    const sair = () => {
        Auth.logout()
        navigate('/')
    }

    return (
        <button onClick={sair}>SAIR</button>
    )
}

export default Logout;
