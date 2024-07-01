import { combineReducers } from "redux";
import eventsReducer from "../slices/eventsSlice";
import threeEventsReducer from "../slices/threeEventsSlice";

const rootReducer = combineReducers({
  events: eventsReducer,
  threeEvents: threeEventsReducer,
});

export default rootReducer;
