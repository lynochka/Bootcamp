export default function courseReducer(state = [], action) {
  switch (action.type) {
    case "CREATE_COURSE":
      return [...state, { ...action.course }];
    default:
      return state;
  }
}
// alternative to a course array - storing courses by ID
// https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
