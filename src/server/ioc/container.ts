import "reflect-metadata";
import { Container } from "inversify";
import { AuthModule } from "../auth";
import { GoogleModule } from "../google";
import { ProductListModule } from "../product-list";

const container = new Container();

container.load(AuthModule, GoogleModule, ProductListModule);

export { container };
