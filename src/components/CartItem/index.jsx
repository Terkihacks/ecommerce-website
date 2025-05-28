import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { CartContext } from "~contexts/CartContext";
import PropTypes from 'prop-types';


const CartItem = ({ item }) => {
  
  const { removeFromCart, increaseAmount, decreaseAmount } = useContext(CartContext);
  const { product_id, product_name, image_url, product_price, amount } = item;

  const getFinalPrice = (price, amount) => parseFloat(price * amount).toFixed(2);

  return (
    <div
      className="
                flex gap-x-4 py-2 lg:px-6 
                border-b border-gray-200 w-full 
                font-light text-gray-500
                "
    >
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <Link to={`/product/${product_id}`}>
          <img className="max-w-[80px]" src={image_url} alt="" />
        </Link>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            <Link
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
              to={`/product/${product_id}`}
            >
              {product_name}
            </Link>
            <div
              className="text-xl cursor-pointer"
              onClick={() => removeFromCart(product_id)}
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            <div
              className="
                        flex flex-1 max-w-[100px] items-center 
                        h-full border text-primary font-medium
                        "
            >
              <div
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
                onClick={() => decreaseAmount(product_id)}
              >
                <IoMdRemove />
              </div>
              <div className="h-full flex justify-center items-center px-2">
                {amount}
              </div>
              <div
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
                onClick={() => increaseAmount(product_id)}
              >
                <IoMdAdd />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-around">
              Ksh {product_price}
            </div>
            <div className="flex-1 flex justify-end items-center text-primary font-medium">{`Ksh ${getFinalPrice(
              product_price,
              amount
            )}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    product_id: PropTypes.number.isRequired,
    product_name: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    product_price: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired
  }).isRequired
};
export default CartItem;
