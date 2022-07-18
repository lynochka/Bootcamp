import * as types from "./../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      return [...state, { ...action.course }];
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}
// alternative to a course array - storing courses by ID
// https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
