import { ContainerModule, decorate, injectable } from "inversify";
import { GoogleConfig } from "./google.config";
import type { IGoogleConfig } from "./google.config.interface";

const GOOGLE_CONFIG = Symbol("IGoogleConfig");

const GoogleModule = new ContainerModule((bind) => {
  decorate(injectable(), GoogleConfig);
  bind<IGoogleConfig>(GOOGLE_CONFIG).to(GoogleConfig).inSingletonScope();
});

export { GOOGLE_CONFIG, GoogleModule };
