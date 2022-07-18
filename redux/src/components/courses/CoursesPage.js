import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActons";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

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
    this.props.actions.createCourse(this.state.course);
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
  actions: PropTypes.object.isRequired,
};

// removed ownProps as the second argument
function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // bindActionCreators can accept a function or an object, so we can pass in all actions:
    actions: bindActionCreators(courseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
