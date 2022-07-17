import React from "react";

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
    alert(this.state.course.title);
  };

  render() {
    return (
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
    );
  }
}

export default CoursesPage;
