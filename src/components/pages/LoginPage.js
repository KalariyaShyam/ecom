import { useContext, useEffect, useState } from "react";
import BoxCard from "../boxcard/BoxCard";
import Button from "../button/Button";
import Input from "../input/Input";
import UserData from "../../data/user.json";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const auth = useContext(AuthContext);
    const setUser = auth.setUser;
    const setRole = auth.setRole;
    const navigate = useNavigate();
    const LoginHandler = (e) => {
        e.preventDefault();

        let result = UserData.filter((value) => {
            if (value.name == userName && value.password == password) {
                setUser(value);
                localStorage.setItem("loginStatus", true)
                setRole(value.role);
                if (value.role == "admin") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/home");
                }
                return value;
            }
        });
        console.log(result);
        if (result.length == 0) {
            alert("User name Or Password is Wrong.Please Try again.")
        }
    }


    const userNameHandler = (val) => {
        setUserName(val)
    }

    const passwordHandler = (val) => {
        setPassword(val)
    }

    return (
        <div className="login-section">
            <BoxCard width="w-25" >
                <form onSubmit={LoginHandler} className="login-form">
                    <Input label="UserName" type="text" phInput="Enter User Name" updateInput={(e) => userNameHandler(e.target.value)} />
                    <Input label="Password" type="password" phInput="Enter Password" updateInput={(e) => passwordHandler(e.target.value)} />
                    <Button buttonText="login" buttonClass="primary" />
                </form>
            </BoxCard>
        </div>
    );

}

export default LoginPage;
