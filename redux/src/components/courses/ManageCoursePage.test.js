import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { authors, newCourse, courses } from "../../../tools/mockData";
import ManageCoursePage from "./ManageCoursePage";
import { Provider as ReduxProvider } from "react-redux";

import configureAppStore from "../../redux/configureAppStore";
import { BrowserRouter } from "react-router-dom";

function renderComponent(args) {
  const defaultProps = {
    authors,
    courses,
    // Passed from React Router in real app, so just stubbing in for test.
    // Could also choose to use MemoryRouter as shown in Header.test.js,
    // or even wrap with React Router, depending on whether I
    // need to test React-Router related behavior.
    history: {},
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {},
  };
  const store = configureAppStore({ courses, authors });

  const props = { ...defaultProps, ...args };
  return render(
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ManageCoursePage {...props} />
      </BrowserRouter>
    </ReduxProvider>
  );
}

it("sets error when attempting to save an empty title field", () => {
  const wrapper = renderComponent();
  fireEvent.click(wrapper.getByRole("button"));

  const error = wrapper.getAllByRole("alert")[0];
  expect(error).toHaveTextContent("Title is required.");
});
