import { combineReducers } from "redux";
import courses from "./courseReducer"; //new name impacts how we refence the data in Redux store

const rootReducer = combineReducers({
  courses,
});

export default rootReducer;
