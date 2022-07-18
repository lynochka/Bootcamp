import * as types from "./actionTypes";

// an action-creator function
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}
