// import { createSelector } from "@reduxjs/toolkit";
// import { RootState } from "../store";

// const selectDataMgRl = (state: RootState) => state.dataMgRl.dataMgRl;

// export const selectManagerRoleUsersCount = createSelector(
//   selectDataMgRl,
//   (dataMgRl) => {
//     const roleUsersCount: { [roleName: string]: number } = {};
//     dataMgRl.forEach((user) => {
//       const { Role } = user;
//       if (Role in roleUsersCount) {
//         roleUsersCount[Role]++;
//       } else {
//         roleUsersCount[Role] = 1;
//       }
//     });

//     return roleUsersCount;
//   }
// );
export interface hi{}
