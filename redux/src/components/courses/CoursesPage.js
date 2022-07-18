import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActons";
import PropTypes from "prop-types";

class CoursesPage extends React.Component {
  // less code than constructor(props) + super(props) + this.state = {...}
  state = {
    course: {
      title: "",
    },
  };

  //arrow function inherits the binding context of their enclosing scope
  // better than this.handleChange = this.handleChange.bind(this); in the constructor
  handleChange = (event) => {
    // unless arrow function or binded: this in ...this.state refers to the change caller
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course }); // object shorthand syntax
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createCourse(this.state.course);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Courses</h2>
          <h3>Add course</h3>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.course.title}
          />
          <input type="submit" value="Save" />
        </form>
        {this.props.courses.map((course, index) => (
          <div key={index}>{course.title}</div>
        ))}
      </div>
    );
  }
}

// expect dispatch to be passed in if we omit mapDispatchToProps
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  createCourse: PropTypes.func.isRequired,
};

// removed ownProps as the second argument
function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

// mapDispatchToProps as an object, where each property is expected to be an action-creator function
const mapDispatchToProps = {
  createCourse: courseActions.createCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
