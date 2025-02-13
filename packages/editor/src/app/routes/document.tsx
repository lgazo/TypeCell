import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { tryPathToIdentifiers } from "../../identifiers/paths/identifierPathHelpers";
import { SessionStore } from "../../store/local/SessionStore";
import DocumentView from "../documentRenderers/DocumentView";
// import { SupabaseSessionStore } from "../supabase-auth/SupabaseSessionStore";
import { RouteContext } from "./RouteContext";
import { URLUpdater } from "./URLUpdater";
// import { OwnerAliasRoute } from "./ownerAlias";
import { OwnerAliasRoute } from "./nextCloudOwnerAlias";

export const DocumentRoute = observer(
  (props: { sessionStore: SessionStore }) => {
    const { sessionStore } = props;
    // if (!(sessionStore instanceof SupabaseSessionStore)) {
    //   throw new Error("No session store");
    // }

    const location = useLocation();

    if (!sessionStore.coordinators) {
      return <div>Loading</div>;
    }

    const [owner, workspace, ...documentParts] = decodeURIComponent(
      location.pathname,
    )
      .substring(1)
      .split("/");
    const document = documentParts.join("/");

    if (!owner || owner.length < 2 || !owner.startsWith("@")) {
      const identifiers = tryPathToIdentifiers(
        decodeURIComponent(location.pathname).substring(1),
      );
      if (identifiers !== "invalid-identifier") {
        const [id, ...subs] = identifiers;
        return (
          <RouteContext.Provider value={{ groups: [identifiers] }}>
            <URLUpdater
              identifiers={identifiers}
              sessionStore={props.sessionStore}
            />
            <DocumentView
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              id={id}
              subIdentifiers={subs}
              sessionStore={sessionStore}
            />
          </RouteContext.Provider>
        );
      } else {
        return <div>Not found</div>;
      }
    }

    return (
      <OwnerAliasRoute
        owner={owner.substring(1)}
        workspace={workspace}
        document={document}
        sessionStore={sessionStore}
      />
    );
  },
);
