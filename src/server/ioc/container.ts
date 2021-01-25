import "reflect-metadata";
import { Container } from "inversify";
import { AuthModule } from "../auth";
import { GoogleModule } from "../google";

const container = new Container();

container.load(AuthModule, GoogleModule);

export { container };
