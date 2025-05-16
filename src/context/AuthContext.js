import { createContext, useState } from "react";
import userData from "../data/user.json";

export const AuthContext = createContext("");


function AuthProvider({ children }) {
    const [user, setUser] = useState([]);
    const [allUser, setAllUser] = useState(userData);
    const [role, setRole] = useState(false);
    const [cart, setCart] = useState([]);
    if (localStorage.getItem("loginStatus") == undefined) {
        localStorage.setItem("loginStatus", false);
    }

    return (
        <AuthContext.Provider value={{ user, setUser, role, setRole, cart, setCart, allUser, setAllUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;