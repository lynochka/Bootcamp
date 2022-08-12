import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as courseActions from "./actions/courseActions";
import { configureStore } from "@reduxjs/toolkit";
import { act } from "react-test-renderer";

it("Should handle creating courses", function () {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
  const course = { title: "Clean Code" };

  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);

  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(course);
});

// We could create an array of actions, and then assert that
// the final result is what we expected.
