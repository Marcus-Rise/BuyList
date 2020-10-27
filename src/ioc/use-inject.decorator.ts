import { useContext, useMemo } from "react";
import { store } from "../store";

export const useInject = <T>(provider: symbol): T => {
  const {
    state: { container },
  } = useContext(store);

  return useMemo(() => container.get<T>(provider), [container, provider]);
};
