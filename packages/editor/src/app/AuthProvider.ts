import { SessionStore } from "../store/local/SessionStore";

export type AuthProvider<T extends SessionStore> = {
  routes: {
    login: (sessionStore: T) => JSX.Element;
    register: (sessionStore: T) => JSX.Element;
    additionalRoutes: (sessionStore: T) => JSX.Element;
  };
};
