import type { Container } from "inversify";
import { container } from "../ioc/container";
import React, { createContext, useReducer } from "react";

interface IAppState {
  container: Container;
}

interface IAppContext {
  state: IAppState;
}

const initState: IAppState = {
  container,
};

const store = createContext<IAppContext>({
  state: initState,
});

const reducer: React.Reducer<IAppState, unknown> = (prevState) => prevState;

const { Provider } = store;

const AppProvider: React.FC = ({ children }) => {
  const [state] = useReducer(reducer, initState);

  return <Provider value={{ state }}>{children}</Provider>;
};

export { store, AppProvider };
