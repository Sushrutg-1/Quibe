import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../..";

export const getAllPosts = createAsyncThunk(
  "post/get_posts",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get("/posts");

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async (userData, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("token", localStorage.getItem("token"));
      formData.append("body", userData.body);
      formData.append("media", userData.file);

      const response = await clientServer.post("/create_post", formData);

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
