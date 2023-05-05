import { atom, selector } from "recoil";

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
export const activeSubTabState = atom({
  key: "activeSubTabState",
  default: {
    "Application 1": false,
    "Application 2": false,
    "Application 3": false,
    "AddApartment" : false
  },
});

// Define the initial state for the list of rooms
export const apartmentListState = atom({
  key: "apartmentListState",
  default: [],
});
export const tenantListState = atom({
  key: "tenantListState",
  default: [],
});

// // Define a selector to get a single room by ID
// export const roomByIdSelector = selector({
//   key: "roomByIdSelector",
//   get:
//     ({ get }) =>
//     (id) => {
//       const roomList = get(roomListState);
//       return roomList.find((room) => room.id === id);
//     },
// });

// // Define a selector to get the total number of rooms
// export const roomCountSelector = selector({
//   key: "roomCountSelector",
//   get: ({ get }) => {
//     const roomList = get(roomListState);
//     return roomList.length;
//   },
// });
