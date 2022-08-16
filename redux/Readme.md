# Courses App 

Based on https://app.pluralsight.com/library/courses/react-redux-react-router-es6

- Much changes Redux tests using react-testing-library instead of Enzyme
- Newer Redux tools such as configureStore
- All modifications related to fresh package versions: React-18, React-router-6, Boostrap-5.

## Additional challenges

1. Add support for administering authors. Make sure you can't delete an author who has a course.
1. Add filters for the course list.
1. Hide empty course list.
1. Message to the user when they try to leave the course form while they have unsaved changes.
1. Enhance the clinet- and server-side data validation on the Manage Course form.
1. Show 404 on the Manage Course page when an invalide course slug is provided in the URL.
</br>
Hint: Add some logic to mapStateToProps.
1. Show the number of courses in the header.
</br>
Hint: Should be trivial thanks to Redux store.
1. Add Pagination to the course table.
1. Sort course table by Title by default. Add drop-downs above the table to sort by different columns.
</br>
Hint: mapStateToProps is a good way.
1. Try to keep the old course data, so that users could view history and click Undo to revert their changes even after hitting Save.