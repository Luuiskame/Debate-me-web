import { combineReducers } from "redux";
import userReducer from "./user/userReducer";

//Here will be combining all the reducers/slices we have for each specific thing

const rootReducer = combineReducers({
    user: userReducer
})

export default rootReducer