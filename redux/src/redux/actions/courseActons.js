import * as types from "./actionTypes";
import * as courseAPI from "../../api/courseApi";

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
  return function (dispatch, getState) {
    // instead of passing the course in from the form,
    // we may choose to access the store state within the thunk
    // without having to pass the data all into your thunk

    //eslint-disable-next-line no-unused-vars
    console.log("-->", Object.keys(getState));

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
