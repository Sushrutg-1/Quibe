/*  
* STEPS : for state management
    1. Submit Action
    2. Handle action in its reducer
    3. Register here -> reducer
*
    Simply : 
    define action -> define reducer -> add reducer in store
*/

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer/index.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
