import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const initialUser = createEntityAdapter();

const initialState = initialUser.getInitialState();

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (response) => initialUser.setAll(initialState, response),
    }),
  }),
});

export const { useGetUsersQuery } = userSlice;

const selectUserResult = userSlice.endpoints.getUsers.select();
const selectUserData = createSelector(selectUserResult, (response) => response.data);

export const { selectAll: getAllUsers, selectById: getUserById, selectIds: getUserIds } = initialUser.getSelectors((state) => selectUserData(state) ?? initialState);
