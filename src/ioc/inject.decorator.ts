import { container } from "./container";
import type { Container } from "inversify";

const inject = <T>(provider: symbol, iocContainer: Container = container): T => {
  return iocContainer.get<T>(provider);
};

export { inject };
