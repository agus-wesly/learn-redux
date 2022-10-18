import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";
import { sub } from "date-fns";

const initialPost = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = initialPost.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: (response) => {
        let min = 1;
        const transformedRes = response.map((res) => {
          if (!res.date) {
            res.date = sub(new Date(), { minutes: min++ }).toISOString();
          }

          if (!res.reactions)
            res.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return res;
        });
        return initialPost.setAll(initialState, transformedRes);
      },
      providesTags: (response, err, arg) => [{ type: "Post", id: "LIST" }, ...response.ids.map((id) => ({ type: "Post", id }))],
    }),
    getPostByUserId: builder.query({
      query: (id) => `/posts?userId=${id}`,
      transformResponse: (response) => {
        const transformedRes = response.map((res) => {
          let min = 1;
          if (!res.date) res.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!res.reactions)
            res.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return res;
        });
        return initialPost.setAll(initialState, transformedRes);
      },
      providesTags: (response, err, arg) => [{ type: "Post", id: "LIST" }, ...response.ids.map((id) => ({ type: "Post", id }))],
    }),
    addPost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...data,
          userId: Number(data.userId),
          date: new Date().toISOString(),
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          },
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `/posts/${data.id}`,
        method: "PUT",
        body: {
          ...data,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (response, err, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (response, err, arg) => [{ type: "Post", id: arg.id }],
    }),
    addReaction: builder.mutation({
      query: ({ postId, reactions }) => ({
        url: `/posts/${postId}`,
        method: "PATCH",
        body: { reactions },
      }),
      async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
        const postResult = dispatch(
          extendedApiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            //Immer Js is running here
            const post = draft.entities[postId];
            if (post) post.reactions = reactions;
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          postResult.undo();
        }
      },
    }),
  }),
});

export const selectPostResult = extendedApiSlice.endpoints.getPosts.select();

const selectPostData = createSelector(selectPostResult, (response) => response.data);

export const { selectAll: getAllPosts, selectById: getSinglePost, selectIds: getPostIds } = initialPost.getSelectors((state) => selectPostData(state) ?? initialState);

export const { useGetPostsQuery, useGetPostByUserIdQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation, useAddReactionMutation } = extendedApiSlice;
