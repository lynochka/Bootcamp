import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActons";
import * as authorActions from "../../redux/actions/authorActions";

import PropTypes from "prop-types";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  componentDidMount() {
    this.props.loadCourses().catch((error) => {
      alert("Loading courses failed" + error);
    });
    this.props.loadAuthors().catch((error) => {
      alert("Loading authors failed" + error);
    });
  }

  render() {
    return <CourseList courses={this.props.courses} />;
  }
}

// expect dispatch to be passed in if we omit mapDispatchToProps
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
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
  };
}

// mapDispatchToProps as an object, where each property is expected to be an action-creator function
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
