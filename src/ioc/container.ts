import "reflect-metadata";
import { Container } from "inversify";
import { ProductListModule } from "../product-list";
import { BudgetModule } from "../budget";

const container = new Container();

container.load(BudgetModule, ProductListModule);

export { container };
