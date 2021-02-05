import { ContainerModule } from "inversify";
import type { IAuthService } from "./auth.service.interface";
import { AUTH_SERVICE_PROVIDER } from "./auth.service.provider";
import { AuthService } from "./auth.service";

const AuthModule = new ContainerModule((bind) => {
  bind<IAuthService>(AUTH_SERVICE_PROVIDER).to(AuthService).inSingletonScope();
});

export { AuthModule };
