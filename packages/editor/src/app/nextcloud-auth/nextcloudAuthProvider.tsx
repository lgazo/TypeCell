import { Route } from "react-router-dom";

import { NextCloudSessionStore } from "./NextCloudSessionStore";

import { observer } from "mobx-react-lite";
import { AuthProvider } from "../AuthProvider";

const DummyAuth = observer((props: { sessionStore: NextCloudSessionStore }) => {
  return <div>Dummy auth for NextCloud</div>;
});

export const nextcloudAuthProvider: AuthProvider<NextCloudSessionStore> = {
  routes: {
    login: (sessionStore: NextCloudSessionStore) => (
      <DummyAuth sessionStore={sessionStore} />
    ),
    register: (sessionStore: NextCloudSessionStore) => (
      <DummyAuth sessionStore={sessionStore} />
    ),
    additionalRoutes: (sessionStore: NextCloudSessionStore) => (
      <>
        <Route
          path="/recover"
          element={<DummyAuth sessionStore={sessionStore} />}
        />
        <Route
          path="/username"
          element={<DummyAuth sessionStore={sessionStore} />}
        />
      </>
    ),
  },
};
