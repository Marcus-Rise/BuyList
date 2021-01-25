import "reflect-metadata";
import { Container } from "inversify";
import { AuthModule } from "./auth.module";
import { AuthConfig } from "./auth.config";
import { AUTH_CONFIG } from "./auth.module-keys";

describe("AuthModule", () => {
  test("AuthConfig", () => {
    const container = new Container();
    container.load(AuthModule);

    expect(container.get(AUTH_CONFIG)).toBeInstanceOf(AuthConfig);
  });
});
