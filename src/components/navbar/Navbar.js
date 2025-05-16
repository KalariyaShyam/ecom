import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
    const auth = useContext(AuthContext);
    const cart = auth.cart;
    const role = auth.role;
    const loginStatus = localStorage.getItem("loginStatus");
    const [total, setotal] = useState(0);
    useEffect(() => {
        setotal(0);
        cart.map((item) => {
            setotal((prev) => prev + item.count);

        })
    }, [cart])
    return (
        <>
            <ul className="menu">
                <li><Link to={"/home"} >Home</Link></li>
                <li><Link to={"/cart"} ><i className="fa-solid fa-cart-shopping"></i> <span>{total}</span></Link></li>
                {(loginStatus == "true" && role == "admin") && <li><Link to={"/admin-dashboard"} >Account</Link></li>}
                {loginStatus == "true" && <li><Link to={"/logout"} >LogOut</Link></li>}
                {loginStatus == "false" && <li><Link to={"/login"} >Login</Link></li>}
            </ul>
        </>
    )
}
export default Navbar;