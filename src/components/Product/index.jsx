import { useContext } from "react";
import { Link } from "react-router-dom";
import { HiPlusSmall, HiEye } from "react-icons/hi2";
import { CartContext } from "~contexts/CartContext";

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { product_id, image_url, category, product_name, product_price } = product;
  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={image_url}
              alt=""
            />
          </div>
        </div>
        <div
          className="
                    absolute top-6 -right-11 group-hover:right-5 p-2 
                    flex flex-col items-center justify-center 
                    gap-y-2 opacity-0 group-hover:opacity-100
                    transition-all duration-300
                    "
        >
          <button onClick={() => addToCart(product, product_id)}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
              <HiPlusSmall className="text-3xl" />
            </div>
          </button>
          <Link
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
            to={`/product/${product_id}`}
          >
            <HiEye />
          </Link>
        </div>
      </div>
      <div>
        <div className="text-sm capitalize text-gray-500 mb-1">{category}</div>
        <Link to={`/product/${product_id}`}>
          <h2 className="font-semibold mb-1">{product_name}</h2>
        </Link>
        <h2 className="font-semibold">Ksh {product_price}</h2>
      </div>
    </div>
  );
};
export default Product;
