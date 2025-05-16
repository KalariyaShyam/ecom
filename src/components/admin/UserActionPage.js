
import BoxCard from "../boxcard/BoxCard";
import Button from "../button/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Input from "../input/Input";

function UserActionPage() {
    const auth = useContext(AuthContext);
    const { id } = useParams();
    const setUserDatas = auth.setAllUser;
    const userData = auth.allUser;
    const navigater = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [curentUser, setCurentUser] = useState([]);

    useEffect(() => {
        if (id != undefined) {
            const user = userData.filter((item) => {
                if (item.user_id == id) {
                    setUserName(item.name);
                    setEmail(item.email);
                    return item;
                }
            });
            setCurentUser(user);
        }
    }, [id])

    const userHandler = (e) => {
        e.preventDefault();
        if (id == undefined) {
            const data = {
                "user_id": userData[userData.length - 1].user_id + 1,
                "name": userName,
                "password": password,
                "email": email,
                "role": "user",
                "status": 1
            }
            setUserDatas((prev) => [...prev, data])
        } else {
            setUserDatas((prev) => prev.map((item) => {
                if (item.user_id == id) {
                    return { ...item, name: userName, password: password, email: email, }
                }
                return { ...item }
            }));
        }

    }


    const backToAdminHandler = (id) => {
        navigater("/admin-dashboard");
    }
    const userNameHandler = (val) => {
        setUserName(val)
    }
    const emailHandler = (val) => {
        setEmail(val)
    }
    const passwordHandler = (val) => {
        setPassword(val)
    }
    return (
        <div className="admin-dashboard">
            <Button buttonText="Back" buttonClass="primary" buttonClick={backToAdminHandler} />
            <BoxCard>
                <form onSubmit={userHandler} className="login-form">
                    {id != undefined && <> <Input label="Name" type="text" value={userName} phInput="Enter User Name" updateInput={(e) => userNameHandler(e.target.value)} />
                        <Input label="Email" type="email" value={email} phInput="Enter Email" updateInput={(e) => emailHandler(e.target.value)} /></>}
                    {id == undefined && <><Input label="Name" type="text" phInput="Enter User Name" updateInput={(e) => userNameHandler(e.target.value)} />
                        <Input label="Email" type="email" phInput="Enter Email" updateInput={(e) => emailHandler(e.target.value)} /></>}
                    <Input label="Password" type="password" phInput="Enter Password" updateInput={(e) => passwordHandler(e.target.value)} />
                    <Button buttonText="Save" buttonClass="primary" />
                </form>
            </BoxCard>
        </div>
    );
}

export default UserActionPage;