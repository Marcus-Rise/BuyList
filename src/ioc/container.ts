import "reflect-metadata";
import { Container } from "inversify";
import { ProductListModule } from "../product-list";
import { AuthModule } from "../auth";
import { BudgetModule } from "../budget";

const container = new Container();

container.load(AuthModule, BudgetModule, ProductListModule);

export { container };
