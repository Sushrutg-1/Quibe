import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../..";

export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkApi) => {
    try {
      const response = await clientServer.post("/login", {
        email: user.email,
        password: user.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      } else {
        return thunkApi.rejectWithValue({ message: "Token is missing!" }); //Like a payload
      }
      console.log(response.data);
      return thunkApi.fulfillWithValue({ token: response.data.token });
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkApi) => {
    try {
      const response = await clientServer.post("/register", {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
      });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);
