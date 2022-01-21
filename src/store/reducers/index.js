import {combineReducers} from "redux";
import {updateReducer} from "./updateReducer";
const reducers = combineReducers({
    updateData : updateReducer,
});
export default reducers;