import { useContext } from "react";
import { store } from "../store";

export const useInject = <T>(provider: symbol): T => {
  const {
    state: { container },
  } = useContext(store);

  return container.get<T>(provider);
};
