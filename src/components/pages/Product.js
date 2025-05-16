import Navbar from "../navbar/Navbar";
import ProductData from "../../data/product.json"
import BoxCard from "../boxcard/BoxCard";
import Button from "../button/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Input from "../input/Input";

function Product() {
    const { id } = useParams();
    console.log(id);
    const auth = useContext(AuthContext);
    const cart = auth.cart;
    const setCart = auth.setCart;
    const [curentProduct, setCurentProduct] = useState();
    const [qty, setQty] = useState(0);
    const navigater = useNavigate();

    useEffect(() => {

        const prod = ProductData.filter((item) => {
            if (item.product_id == id) {
                return item;
            }
        });
        console.log(prod);
        setCurentProduct(prod);
        if (prod.length == 0) {
            navigater("/home");
        }
    }, [id])

    const addToCart = (value) => {
        value.count = qty;
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
                    let count = parseInt(item.count) + parseInt(qty);
                    return { ...item, count: count }
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
                {curentProduct &&
                    <BoxCard >
                        <div className="prduct-view">

                            <div className="left-product-img">
                                <img src={curentProduct[0].image_path} className="home-product-image" />
                            </div>
                            <div>
                                <h2>{curentProduct[0].name}</h2>
                                <p>${curentProduct[0].price}</p>
                                <p>{curentProduct[0].description}</p>

                                <Input type="number" min="1" updateInput={(e) => setQty(e.target.value)} />
                                <Button buttonText="Add To Cart" buttonClick={() => addToCart(curentProduct[0])} buttonClass="primary w-100" />
                            </div>
                        </div>
                    </BoxCard>
                }

            </div>
        </div>
    );
}

export default Product;