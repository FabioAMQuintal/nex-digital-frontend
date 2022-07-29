import axios from "axios";
import config from '../../config/index'

class Auth {

    async login(email: string, password: string){
        try{
            const response = await axios.post(config.baseUrlLocal.concat(config.user, config.signin),{
                email,
                password
            });

            if(response.data.JWTtoken){
                localStorage.setItem("JWT_token", JSON.stringify(response.data.JWTtoken));
            }
            return response;
        } catch(e: any) {
            return e;
        }
    }

    logout(){
        localStorage.removeItem("JWT_token");
    }

    getCurrentUser(){
        const user = localStorage.getItem("JWT_token");
        if(user){
            return JSON.parse(user)
         } 
         return null
    }
}

export default new Auth();