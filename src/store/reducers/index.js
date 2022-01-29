import { combineReducers } from "redux";
import { updateReducer } from "./updateReducer";
import { userReducer } from "./userReducer";
const reducers = combineReducers({
  updateData: updateReducer,
  user: userReducer,
});
export default reducers;
