import * as types from "./actionTypes";

export function beginApiCall() {
  return { type: types.BEGIN_API_CALL };
}

export function apiCallError() {
  return { type: types.API_CAL_ERROR };
}
