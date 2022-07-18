import * as types from "./actionTypes";

import * as courseAPI from "../../api/courseApi";

// an action-creator function
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}

// convention to use ...Success
// could follow a corresponding ...Failure or ...Error
export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

//thunk
export function loadCourses() {
  //dispatch as a first argument
  return function (dispatch) {
    return courseAPI
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}
