import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      // https://fakestoreapi.com/products
      // http://localhost:5004/products/get-products
      const response = await fetch("http://localhost:5004/products/get-products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProductProvider;
 