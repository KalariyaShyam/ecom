import Button from "../button/Button";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";

function AdminDashboardPage() {
    const auth = useContext(AuthContext);
    const cart = auth.cart;
    const setCart = auth.setCart;
    const setUserDatas = auth.setAllUser;
    const userDatas = auth.allUser;
    const navigater = useNavigate();

    const editUserHandler = (value) => {
        navigater("/edit-user/" + value)
    }

    const addUserHandler = () => {
        navigater("/add-user")
    }

    const deleteUserHandler = (id) => {
        setUserDatas((prev) => prev.filter((value) => {
            if (value.user_id != id) {
                return { ...prev };
            }
        }))
    }
    return (
        <>
            <Navbar />
            <div className="admin-dashboard">

                <Button buttonText="Add New User" buttonClass="primary" buttonClick={addUserHandler} />
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userDatas.map((item, index) => {

                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>

                                        <td><Button buttonText="Edit" buttonClick={() => editUserHandler(item.user_id)} buttonClass="primary w-50" />
                                            <Button buttonText="Delete" buttonClick={() => deleteUserHandler(item.user_id)} buttonClass="primary w-50" />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div></>
    );
}

export default AdminDashboardPage;