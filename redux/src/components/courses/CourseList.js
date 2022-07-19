import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

const CourseList = ({ courses }) => {
  const navigate = useNavigate();

  return (
    <>
      <h2>Courses</h2>
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate("/course");
        }}
      >
        Add Course
      </button>
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            return (
              <tr key={course.id}>
                <td>
                  <a
                    className="btn btn-primary"
                    href={"https:/pluralsight.com/course" + course.slag}
                  >
                    Watch
                  </a>
                </td>
                <td>
                  <Link to={"/course/" + course.slug}>{course.title}</Link>
                </td>
                <td>{course.authorName}</td>
                <td>{course.category}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
};

export default CourseList;
