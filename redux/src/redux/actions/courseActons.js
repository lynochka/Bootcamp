import * as types from "./actionTypes";
import * as courseAPI from "../../api/courseApi";
import { beginApiCall } from "./apiStatusActions";

// --- action-creator functions ---

// convention to use ...Success
// could follow a corresponding ...Failure or ...Error
export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

// --- thunks ---

export function loadCourses() {
  //dispatch as a first argument
  return function (dispatch) {
    // dispatching beginApiCall here shows explicitly
    // which thunks should follow a preloader and which not, e.g., an optimistic create/update/delete
    dispatch(beginApiCall());
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

export function saveCourse(course) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    // instead of passing the course in from the form,
    // we may choose to access the store state within the thunk
    // without having to pass the data all into your thunk

    dispatch(beginApiCall());

    return courseAPI
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        throw error;
      });
  };
}
