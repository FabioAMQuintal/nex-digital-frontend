import axios, { AxiosResponse } from "axios";
import config from "../../config/index";

class Register {

    async register(name: string, email: string, password: string){
        try{
            const response = await axios.post(config.baseUrlLocal.concat(config.user, config.signup),{
                name,
                email,
                password
            });
            return response
        } catch(e: any) {
            return e;
        }
    }

}

export default new Register();