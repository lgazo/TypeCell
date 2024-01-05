import {
  DefaultShorthandResolver,
  setDefaultShorthandResolver,
} from "../../identifiers/paths/identifierPathHelpers";
import { computed, makeObservable, observable, runInAction } from "mobx";
import { SessionStore } from "../../store/local/SessionStore";
import { Identifier } from "../../identifiers";
import { arrays } from "vscode-lib";

const colors = [
  "#958DF1",
  "#F98181",
  "#FBBC88",
  "#FAF594",
  "#70CFF8",
  "#94FADB",
  "#B9F18D",
];

export class NextCloudSessionStore extends SessionStore {
  public storePrefix = "nc";

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public userColor = arrays.getRandomElement(colors)!;

  private initialized = false;
  public userId: string | undefined = undefined;

  public user:
    | "loading"
    | "offlineNoUser"
    | {
        type: "guest-user";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        supabase: any;
      }
    | {
        type: "user";
        fullUserId: string;
        userId: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        supabase: any;
        profileId: string;
        isSignUp: boolean;
      } = "loading";

  constructor(loadProfile = true, persist = true) {
    super(loadProfile);
    makeObservable(this, {
      user: observable.ref,
      userId: observable.ref,
      isLoggedIn: computed,
      isLoaded: computed,
    });
    this.initializeReactions();
  }

  public async initialize() {
    if (this.initialized) {
      throw new Error("initialize() called when already initialized");
    }
    this.initialized = true;

    this._register({
      dispose: () => {
        throw new Error("dispose in _register");
      },
    });

    runInAction(() => {
      setDefaultShorthandResolver(new DefaultShorthandResolver()); // hacky
      // this.userId = session.user.id;
      // this.user = {
      //   type: "user",
      //   supabase: this.supabase,
      //   userId: username,
      //   fullUserId: username,
      //   profileId: profile_id,
      //   isSignUp,
      // };
      this.userId = "NC Test";
      this.user = {
        type: "guest-user",
        // userId: "nc_test",
        // fullUserId: "nc_test",
        // profileId: "nc_test_profile_id",
        // isSignUp: false,
        supabase: {},
      };
    });
  }

  public get isLoggedIn(): boolean {
    // return typeof this.user !== "string" && this.user.type === "user";
    return true;
  }
  public get isLoaded(): boolean {
    return this.user !== "loading" || typeof this.userId === "string";
  }
  public get loggedInUserId(): string | undefined {
    return typeof this.user !== "string" && this.user.type === "user"
      ? this.user.userId
      : undefined;
  }
  public logout = async () => {
    if (!this.isLoggedIn) {
      throw new Error("can't logout when not logged in");
    }
    // await this.supabase.auth.signOut();
    throw new Error("Method logout not implemented.");
  };
  public getIdentifierForNewDocument(): Identifier {
    throw new Error("Method not implemented.");
  }
}
