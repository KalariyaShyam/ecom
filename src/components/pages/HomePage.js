import Navbar from "../navbar/Navbar";
import ProductData from "../../data/product.json"
import BoxCard from "../boxcard/BoxCard";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
    const auth = useContext(AuthContext);
    const cart = auth.cart;
    const setCart = auth.setCart;

    const addToCart = (value) => {
        value.count = 1;
        if (cart.length == 0) {
            setCart([value]);
            return true;
        }
        const checkCartCount = cart.filter((item) => {
            if (item.product_id == value.product_id) {
                return item;
            }

        })
        if (checkCartCount.length == 0) {
            setCart((prev) => [...prev, value]);
        } else {


            const updateCartCount = cart.map((item) => {
                if (item.product_id == value.product_id) {

                    return { ...item, count: item.count + 1 }
                } else {
                    return { ...item }
                }

            })
            setCart(updateCartCount);
        }

    }
    return (
        <div className="home-section">
            <Navbar />
            <div className="home-grid-section">
                {
                    ProductData.map((item, index) => {

                        return (
                            <BoxCard width="w-20" key={index}>
                                <Link to={`/product/${item.product_id}`}>
                                    <img src={item.image_path} className="home-product-image" />
                                    <h2>{item.name}</h2>
                                    <p>${item.price}</p>
                                    <p>{item.summry}</p>
                                </Link>
                                <Button buttonText="Add To Cart" buttonClick={() => addToCart(item)} buttonClass="primary w-100" />
                            </BoxCard>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default HomePage;