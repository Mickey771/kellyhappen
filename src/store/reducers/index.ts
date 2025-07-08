import { combineReducers } from "redux";
import authReducer from "./authSlice";
import adminAuthReducer from "./adminAuthSlice";
import userReducer from "./userSlice";
import adminProductReducer from "./adminProductSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  adminAuth: adminAuthReducer,
  adminProduct: adminProductReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
