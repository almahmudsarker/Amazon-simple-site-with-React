import React from "react";
import "./Shop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { addToDb, getShoppingCart, deleteShoppingCart } from "../../utilities/fakedb";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("./products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    //step-1 get the key/id from the addedProduct
    for (const id in storedCart) {
      //step-2 find the product from the products using the id
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        //step-3 get the quantity property of the Product
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        //step-4 push the addedProduct to the savedCart
        savedCart.push(addedProduct);
      }
    }
    //step-5 set the savedCart to the cart state
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (product) => {
    // cart.push(product);
    let newCart = [];
    // const newCart = [...cart, product];
    const exists = cart.find((pd) => pd.id === product.id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd.id !== product.id);
      newCart = [...remaining, exists];
    }

    setCart(newCart);
    addToDb(product.id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart 
        cart={cart}
        handleClearCart={handleClearCart}
        >
          <Link className="proceed-link" to="/orders">
            <button className="btn-proceed">Review Order <FontAwesomeIcon icon={faArrowRightArrowLeft} /></button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
