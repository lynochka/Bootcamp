import React from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActons";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

class ManageCoursePage extends React.Component {
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

  render() {
    return (
      <>
        <h2>Manage Course</h2>
      </>
    );
  }
}

// expect dispatch to be passed in if we omit mapDispatchToProps
ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

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
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);