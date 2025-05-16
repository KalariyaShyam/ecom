import { useContext, useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import Input from "../input/Input";
import { Link } from "react-router-dom";


function CartPage() {
    const auth = useContext(AuthContext);
    const cart = auth.cart;
    const setCart = auth.setCart;
    const [total, setotal] = useState(0);
    useEffect(() => {
        setotal(0);
        cart.map((item) => {
            let count = item.count * item.price;
            setotal((prev) => prev + count);

        })
    }, [cart])
    const removeCartHandler = (id) => {
        setCart((prev) => prev.filter((value) => {
            if (value.product_id != id) {
                return { ...prev };
            }
        }))
    }
    const qtyHandle = (inputval, val) => {
        const updateCartCount = cart.map((item) => {
            if (item.product_id == val.product_id) {
                return { ...item, count: inputval }
            } else {
                return { ...item }
            }

        })
        setCart(updateCartCount);
    }
    return (
        <>
            <Navbar />
            <div className="cart-section">

                {cart.length == 0 && <h2>Empty</h2>}
                {cart.length > 0 && <><table>
                    <thead>
                        <tr>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Qty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            cart.map((item, index) => {

                                return (
                                    <tr key={index} className="cart-list">
                                        <td><Link to={`/product/${item.product_id}`}><img src={item.image_path} /></Link></td>
                                        <td><Link to={`/product/${item.product_id}`}>{item.name}</Link></td>
                                        <td><Input type="number" value={item.count} min="1" updateInput={(e) => qtyHandle(e.target.value, item)} /></td>

                                        <td><a onClick={() => removeCartHandler(item.product_id)}>x</a></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                    <table>
                        <tbody>
                            <tr>
                                <td>Total Amount</td>
                                <td>{total}</td>
                            </tr>
                        </tbody>
                    </table></>
                }
            </div >
        </>
    );
}

export default CartPage;