import * as Constants from "../constants/constants";

const inititalState = {
  selectedPark: {},
  total: 0,
};

export default function parktReducer(state = inititalState, action) {
  switch (action.type) {
    case Constants.PARK_DETAILS:
      return Object.assign({}, state, {
        selectedPark: action.payload,
      });
    default:
      return state;
  }
}
