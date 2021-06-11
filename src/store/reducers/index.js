import { combineReducers } from "redux";
import parkListReducer from "./reducers";

const entitiesReducers = combineReducers({
  parkListReducer,
});

export default combineReducers({
  entities: entitiesReducers,
});
