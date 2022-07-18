import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActons";
import PropTypes from "prop-types";

class CoursesPage extends React.Component {
  componentDidMount() {
    this.props.loadCourses().catch((error) => {
      alert("Loading courses failed" + error);
    });
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        {this.props.courses.map((course, index) => (
          <div key={index}>{course.title}</div>
        ))}
      </>
    );
  }
}

// expect dispatch to be passed in if we omit mapDispatchToProps
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
};

// removed ownProps as the second argument
function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

// mapDispatchToProps as an object, where each property is expected to be an action-creator function
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
