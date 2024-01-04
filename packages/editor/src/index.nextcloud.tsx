import * as yjsBindings from "@syncedstore/yjs-reactive-bindings";
import * as mobx from "mobx";

import { createRoot } from "react-dom/client";
import { NextCloudSessionStore } from "./app/nextcloud-auth/NextCloudSessionStore";
import { HttpsIdentifier } from "./identifiers";
import { SessionStore } from "./store/local/SessionStore";

import { uri } from "vscode-lib";
import { DocumentView } from "./app/documentRenderers";

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

  // const authProvider = supabaseAuthProvider;

  const sessionStore: SessionStore = new NextCloudSessionStore();

  await sessionStore.initialize();

  const props = {
    // id: 'https//google.com/test.md',
    id: new HttpsIdentifier(
      uri.URI.parse(
        window.location.protocol + "//" + window.location.host + "/test.md",
      ),
    ),
    isNested: false,
    // subIdentifiers:{remainingIds}
    subIdentifiers: [],
    sessionStore: sessionStore,
  };

  root.render(
    <DocumentView
      id={props.id}
      isNested={props.isNested}
      subIdentifiers={props.subIdentifiers}
      sessionStore={props.sessionStore}
    />,
  );
}

init();
