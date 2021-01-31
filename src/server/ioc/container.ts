import "reflect-metadata";
import { Container } from "inversify";
import { AuthModule } from "../auth";
import { GoogleModule } from "../google";
import { ProductListModule } from "../product-list";
import { LoggerModule } from "../logger";

const container = new Container();

container.load(LoggerModule, AuthModule, GoogleModule, ProductListModule);

export { container };
