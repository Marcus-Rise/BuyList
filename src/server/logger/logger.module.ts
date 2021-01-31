import { ContainerModule } from "inversify";
import type { ILogger } from "./logger.interface";
import { LOGGER } from "./logger.provider";
import { Logger } from "./logger";

const LoggerModule = new ContainerModule((bind) => {
  bind<ILogger>(LOGGER).to(Logger).inSingletonScope();
});

export { LoggerModule };
