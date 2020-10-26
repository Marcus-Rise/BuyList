import React from "react";

const ProductList: React.FC = (props) => {
  return <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>{props.children}</ul>;
};

export { ProductList };
export default ProductList;
