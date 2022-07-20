import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActons";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
}) {
  const navigate = useNavigate();
  let { slug } = useParams();

  const [course, setCourse] = useState({ ...newCourse });
  //eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function getCourseBySlug(courses, slug) {
    const courseWithSlug = courses.find(
      (course) => course.slug === slug || null
    );
    return courseWithSlug || newCourse;
  }

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, []);

  useEffect(() => {
    setCourse({ ...getCourseBySlug(courses, slug) });
  }, [slug, courses]);

  function handleChange(event) {
    // this destructure avoids the event getting garbage collected,
    // so that it's available within the nested setCourse callback
    const { name, value } = event.target;
    // JS computed property syntax - to reference a property using a variable
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    setSaving(true); // no need to set it back to false since we will redirect to another page
    saveCourse(course).then(() => {
      toast.success("Course saved.");
      navigate("/courses", { replace: true });
    });
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

// expect dispatch to be passed in if we omit mapDispatchToProps
ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
};

// TODO: Place in the courseReducer to be called by other components
// TODO: For performance - memoize the response with a library like reselect

// removed ownProps as the second argument
function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors,
  };
}

// mapDispatchToProps as an object, where each property is expected to be an action-creator function
// by the time those are passed to props, these are *bound* action creators !
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
