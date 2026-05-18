import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts } from "../../action/postAction";

const initialState = {
  posts: [],
  isError: false,
  isLoading: false,
  postFetched: false,
  comments: [],
  postId: "",
  message: "",
  loggedIn: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: () => initialState,
    resetPostId: (state) => {
      state.postId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "fetching all posts..";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.postFetched = true;
        state.posts = action.payload.posts;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.message = action.payload?.message;
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default postSlice.reducer;
