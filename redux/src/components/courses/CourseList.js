import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner";

const CourseList = ({ courses, loading, onDeleteClick }) => {
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
      {loading ? (
        <Spinner />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th />
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th />
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
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      // don't forget to delay a delete and define onClick as a function :)
                      onClick={() => onDeleteClick(course)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CourseList;
