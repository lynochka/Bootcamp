import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseList from "./CourseList";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  componentDidMount() {
    const { courses, authors, loadCourses, loadAuthors } = this.props;

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
  }

  handleDeleteCourse = async (course) => {
    toast.success("Course deleted.");
    try {
      await this.props.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed." + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <CourseList
        courses={this.props.courses}
        loading={this.props.loading}
        onDeleteClick={this.handleDeleteCourse}
      />
    );
  }
}

// expect dispatch to be passed in if we omit mapDispatchToProps
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

// removed ownProps as the second argument
function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find(
                (author) => author.id === course.authorId
              ).name,
            };
          }),
    authors: state.authors,
    // TODO: could we do it via a local state instead?
    loading: state.apiCallsInProgress > 0,
  };
}

// mapDispatchToProps as an object, where each property is expected to be an action-creator function
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  deleteCourse: courseActions.deleteCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
