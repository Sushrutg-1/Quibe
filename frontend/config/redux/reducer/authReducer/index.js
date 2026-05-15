import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../action/authAction";

const initialState = {
  user: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  loggedIn: false,
  message: "",
  profileFetched: false,
  connections: [],
  connectionRequests: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => {
      initialState;
    },
    handleLoginUser: (state) => {
      state.message = "hello";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        isLoading: true;
        message: "knocking the door ..";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        isLoading: false;
        message: "Login is successfull!";
        isError: false;
        isSuccess: true;
        loggedIn: true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        isLoading: false;
        isError: true;
        message: action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        isLoading: true;
        message: "Registering you ..";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        isLoading: false;
        isError: false;
        isSuccess: true;
        loggedIn: true;
        message: "Register successfull!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        isLoading: false;
        isError: true;
        message: action.payload;
      });
  },
});

export default authSlice.reducer;
