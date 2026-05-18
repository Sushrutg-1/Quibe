import { createSlice } from "@reduxjs/toolkit";
import {
  getAboutUser,
  getAllUsers,
  loginUser,
  registerUser,
} from "../../action/authAction";

const initialState = {
  user: undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  loggedIn: false,
  message: "",
  isTokenThere: false,
  profileFetched: false,
  connections: [],
  connectionRequests: [],
  all_profile_fetched: false,
  all_users: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    handleLoginUser: (state) => {
      state.message = "hello";
    },
    emptyMessage: (state) => {
      state.message = "";
    },
    setIsTokenThere: (state) => {
      state.isTokenThere = true;
    },
    setTokenIsNotThere: (state) => {
      state.isTokenThere = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Logging..";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "Login is successfull!";
        state.isError = false;
        state.isSuccess = true;
        state.loggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Registering you ..";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.loggedIn = false;
        state.message = "Register successfull! Please Login!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message;
      })
      .addCase(getAboutUser.pending, (state) => {
        state.message = "Getting user details";
        state.isLoading = true;
      })
      .addCase(getAboutUser.fulfilled, (state, action) => {
        state.message = "User fetched successful!";
        state.isLoading = false;
        state.isError = false;
        state.profileFetched = true;
        state.user = action.payload?.userProfile;
      })
      .addCase(getAboutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message;
      })
      .addCase(getAllUsers.pending, (state, action) => {
        state.message = "fetching all users";
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.all_users = action.payload;
        state.all_profile_fetched = true;
        state.isLoading = false;
        state.isError = false;
        state.message = "user fetched successfully";
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.message = action.payload?.message;
        state.isError = true;
        state.isLoading = false;
        state.all_users = action.payload;
      });
  },
});

export const { reset, emptyMessage, setIsTokenThere, setTokenIsNotThere } =
  authSlice.actions;

export default authSlice.reducer;
