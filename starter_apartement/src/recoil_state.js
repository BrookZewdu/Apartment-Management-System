import { atom } from "recoil";

export const loggedInUserState = atom({
  key: "signedInUser", // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
});

export const myApplicationsState = atom({
  key: "myApplicationsState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const activeTabState = atom({
  key: "activeTabState",
  default: "Home",
});
