import React from "react";

export const ProductList: React.FC = (props) => {
  return <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>{props.children}</ul>;
};
