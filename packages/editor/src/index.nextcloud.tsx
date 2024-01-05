import * as yjsBindings from "@syncedstore/yjs-reactive-bindings";
import * as mobx from "mobx";

import { createRoot } from "react-dom/client";
import { SessionStore } from "./store/local/SessionStore";
import { NextCloudSessionStore } from "./app/nextcloud-auth/NextCloudSessionStore";
// import { HttpsIdentifier } from "./identifiers";

// import { uri } from "vscode-lib";
// import DocumentView from "./app/documentRenderers/DocumentView";
import { DocumentResource } from "./store/DocumentResource";
import App from "./app/AppNextCloud";
import { nextcloudAuthProvider } from "./app/nextcloud-auth/nextcloudAuthProvider";

// hack copied from Main.tsx as it seems it is needed by BaseResource

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).DocumentResource = DocumentResource; // TODO: hack

async function init() {
  // if (!validateHostDomain()) {
  //   throw new Error("invalid hostname for host");
  // }

  // if (!validateSupabaseConfig()) {
  //   throw new Error("accessing prod db on non-prod");
  // }

  yjsBindings.enableMobxBindings(mobx);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = createRoot(document.getElementById("root")!);

  const authProvider = nextcloudAuthProvider;

  const sessionStore: SessionStore = new NextCloudSessionStore();
  await sessionStore.initialize();

  //   const props = {
  //     // id: "https//google.com/test.md",
  //     id: new HttpsIdentifier(
  //       uri.URI.parse(
  //         window.location.protocol +
  //           "//" +
  //           window.location.host +
  //           "/_docs/README.md",
  //       ),
  //     ),
  //     isNested: false,
  //     // subIdentifiers:{remainingIds}
  //     subIdentifiers: [],
  //     sessionStore: sessionStore,
  //   };

  root.render(
    // <DocumentView
    //   id={props.id}
    //   isNested={props.isNested}
    //   subIdentifiers={props.subIdentifiers}
    //   sessionStore={props.sessionStore}
    // />,
    <App authProvider={authProvider} sessionStore={sessionStore} />,
  );
}

init();
