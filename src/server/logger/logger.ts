import type { ILogger } from "./logger.interface";
import { injectable } from "inversify";

@injectable()
class Logger implements ILogger {
  error(message: unknown, target: string): void {
    console.trace(`[${target}]:`, message);
  }

  debug(message: unknown, target: string | string[]): void {
    console.debug(`[${target}]:`, message);
  }
}

export { Logger };
