import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.product_price * currentItem.amount;
    }, 0);
    setTotal(parseFloat(total).toFixed(2));
  }, [cart]);


  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

// Function to add a product to the cart
  const addToCart = (product, product_id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find((item) => {
      return item.id === product_id;
    });

    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === product_id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };
// Function to remove a product from the cart
  const removeFromCart = (product_id) => {
    const newCart = cart.filter((item) => {
      return item.product_id !== product_id;
    });
    setCart(newCart);
  };
  const clearCart = () => {
    setCart([]);
  };
// Function to increase the amount of a product in the cart
  const increaseAmount = (product_id) => {
    const cartItem = cart.find((item) => item.product_id === product_id);
    addToCart(cartItem, product_id);
  };
// Function to decrease the amount of a product in the cart
  const decreaseAmount = (product_id) => {
    const cartItem = cart.find((item) => {
      return item.product_id === product_id;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.product_id === product_id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount <= 1) {
      removeFromCart(product_id);
    }
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CartProvider;
