import React from "react";

const ProductListUl: React.FC = (props) => {
  return <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>{props.children}</ul>;
};

export { ProductListUl };
export default ProductListUl;
