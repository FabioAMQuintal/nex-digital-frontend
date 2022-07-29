import { Auth as AuthService } from '../../services/index'
import { Navigate } from "react-router-dom";

const Auth = ({ children }: { children: JSX.Element }) => {
    const user = AuthService.getCurrentUser()
    if (!user) {
        return <Navigate to='/'/>;
    }
    return children;
}

export default Auth;