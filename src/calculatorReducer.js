import {all} from "ramda";

export const initialState = {
  timeHours: 0,
  timeMinutes: 0,
  timeSeconds: 0,
  distance: 0, // meters?
  paceHours: 0,
  paceMinutes: 0,
  paceSeconds: 0,
  errors: []
};

// TMP - lift
// const fromNullable = obj => [obj];

// isNotZero :: int -> boolean
const isNotZero = val => val > 0;
// const isNotZero = flip(gt(0)); // not better!

// allNotZero :: [int] -> boolean
const allNotZero = all(isNotZero);

// TODO what would be the name for hms? -> 'segment', 'timelike', 'timeable'


export const calculatorReducer = (state, action = {}) => {
  // const safeAction = fromNullable(action);
  // safeAction.map(pipe(prop("type"), equals));

  if ("DATA_CHANGED_EVT" === action.type) {
    return { ...state, [action.payload.name]: action.payload.value };
  }
  if ("CALC_TIME_CMD" === action.type) {
    // need pace and distance. so validate
    if (allNotZero([state.paceMinutes, state.paceSeconds]) && isNotZero(state.distance)) {
      return { ...state, timeHours: 9, timeMinutes: 9, timeSeconds: 9 }; // TODO
    } else {
      alert("To calculate Time, enter the Pace and Distance")
    }
    console.log("TODO calculate time", state);
  }
  return initialState;
};
