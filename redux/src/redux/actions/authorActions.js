import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";

// convention to use ...Success
// could follow a corresponding ...Failure or ...Error
export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

//thunk
export function loadAuthors() {
  //dispatch as a first argument
  return function (dispatch) {
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        throw error;
      });
  };
}
