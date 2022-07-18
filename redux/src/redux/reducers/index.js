import { combineReducers } from "redux";
import courses from "./courseReducer"; //new name impacts how we refence the data in Redux store
import authors from "./authorReducer";

const rootReducer = combineReducers({
  courses,
  authors,
});

export default rootReducer;
