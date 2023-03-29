import React from "react";
import "./Shop.css";
import { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
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
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
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
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
