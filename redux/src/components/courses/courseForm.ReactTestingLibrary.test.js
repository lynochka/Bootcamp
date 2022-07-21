import React from "react";
// components are always mounted
import { render } from "@testing-library/react";
import CourseForm from "./CourseForm";

function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onChange: () => {},
    onSave: () => {},
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it("should render 'Add Course' header", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Course");
});

it("should label save button as 'Save' when not saving", () => {
  const { getByText } = renderCourseForm();
  // if Save is not particularly unique - switch to ID or DOM element on the page
  getByText("Save");
});

it("should label save button as 'Saving' when saving", () => {
  const { getByText, debug } = renderCourseForm({ saving: true });
  // prints rendered html in the terminal
  debug();
  // if Save is not particularly unique - switch to ID or DOM element on the page
  getByText("Saving...");
});
