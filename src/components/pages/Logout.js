import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("loginStatus", false);
        navigate("/");
    })

    return (<></>);
}

export default Logout;