import * as Constants from "../constants/constants";

export const parkDetails = (data) => {
  return {
    type: Constants.PARK_DETAILS,
    payload: data,
  };
};
