import { useMemo } from "react";
import { container } from "./container";
import type { Container } from "inversify";

export const useInject = <T>(provider: symbol, iocContainer: Container = container): T =>
  useMemo(() => iocContainer.get<T>(provider), [iocContainer, provider]);
