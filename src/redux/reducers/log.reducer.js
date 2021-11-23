import { combineReducers } from "redux";

// reducer for storing a user's log (images and journal entries) for a selected trip
const tripLog = (state = {}, action) => {
  switch (action.type) {
    case "SET_TRIP_LOG":
      return action.payload;
    default:
      return state;
  }
};

// // reducer to store user's journal form input
// const journalInput = (state = "", action) => {
//   switch (action.type) {
//     case "SET_JOURNAL_INPUT":
//       return action.payload;
//     case "CLEAR_JOURNAL_INPUT":
//       return "";
//     default:
//       return state;
//   }
// };

// payload={property:property, value:value}
const editEntry = (state = {}, action) => {
  switch (action.type) {
    case "SET_EDIT_ITEM":
      return action.payload;
    case "EDIT_ONCHANGE":
      return { ...state, [action.payload.property]: action.payload.value };
    case "CLEAR_EDIT_ITEM":
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  tripLog,
  // journalInput,
  editEntry,
});
