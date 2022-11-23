import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../Firebase";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        logout()
        setTimeout(() => navigate("/"), 500);
    }, []);

    return (<div>
        <h1>Good Bye!</h1>
    </div>)
}

export default Logout;