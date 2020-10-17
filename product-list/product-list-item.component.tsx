import React from "react";
import { IProduct } from "../product/product.interface";

type IProps = IProduct;

export const ProductListItem: React.FC<IProps> = (props) => <li className="list-group-item">{props.title}</li>;
