import axios from "axios";

class Register {

    async register(name: string, email: string, password: string){

        try{
            const response = await axios.post("http://localhost:3000/api/user/signup",{
                name,
                email,
                password
            });
            return Promise.resolve(response.data);
        } catch(e) {
            return e;
        }
    }

}

export default new Register();