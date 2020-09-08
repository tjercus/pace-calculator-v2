import { all, pipe } from "ramda";

export const initialState = {
  timeHours: 0,
  timeMinutes: 0,
  timeSeconds: 0,
  distance: 0, // meters?
  paceHours: 0,
  paceMinutes: 0,
  paceSeconds: 0,
  errors: [],
};

// TMP - lift
// const fromNullable = obj => [obj];

const isNumeric = (val) => !isNaN(val);

// isNotZero :: int -> boolean
const isNotZero = (val) => val > 0;
// const isNotZero = flip(gt(0)); // not better!

// allNotZero :: [int] -> boolean
const allNotZero = all(isNotZero);

const allNumeric = all(isNumeric);

// TODO what would be the name for hms? -> 'segment', 'timelike', 'timeable'

const hoursFromSeconds = (seconds) => Math.floor(seconds / 3600);

const secondsFromHours = hours => hours * 3600;

const makeTime = state => state.timeSeconds + state.timeMinutes * 60 + state.timeHours * 60 * 60;
const makePace = state => state.paceSeconds + state.paceMinutes * 60 + state.paceHours * 60 * 60;

// 240 + 10 = 250 seconds
//
const minutesFromSeconds = (seconds) => {
  const hrs = hoursFromSeconds(seconds);
  const nsecs = secondsFromHours(hrs);
  const secsleft = seconds - nsecs;
  const fltmin = secsleft / 60;
  return Math.floor(fltmin);
};

const secondsFromSeconds = (seconds) =>
  seconds - hoursFromSeconds(seconds) * 3600 - minutesFromSeconds(seconds) * 60;

export const calculatorReducer = (state, action = {}) => {
  // const safeAction = fromNullable(action);
  // safeAction.map(pipe(prop("type"), equals));

  if ("DATA_CHANGED_EVT" === action.type) {
    return { ...state, [action.payload.name]: action.payload.value };
  }
  if ("CALC_TIME_CMD" === action.type) {
    // need pace and distance. so validate
    //
    if (
      allNumeric([state.paceMinutes, state.paceSeconds]) &&
      isNotZero(state.distance)
    ) {
      // 1. convert pace to seconds
      const pace = makePace(state);
      const time = (state.distance / 1000) * pace;
      return {
        ...state,
        timeHours: hoursFromSeconds(time),
        timeMinutes: minutesFromSeconds(time),
        timeSeconds: secondsFromSeconds(time),
      };
    } else {
      alert("To calculate Time, enter the Pace and Distance");
    }
  }
  if ("CALC_DISTANCE_CMD" === action.type) {
    // 1. check pace and time
    if (
      allNumeric([state.paceHours, state.paceMinutes, state.paceSeconds]) &&
      allNumeric([state.timeHours, state.timeMinutes && state.timeSeconds])
    ) {
      // 2. distance = time (seconds) / pace (m:s)
      const time = makeTime(state);
      const pace = makePace(state);
      const distance = time / pace;
      return {
        ...state,
        distance }
    }
  }
  if ("CALC_PACE_CMD" === action.type) {
    if (allNumeric([state.timeHours, state.timeMinutes && state.timeSeconds] && isNotZero(state.distance))) {
      const time = makeTime(state);
      const pace = time / state.distance;
      return {
        ...state,
        paceHours: hoursFromSeconds(pace),
        paceMinutes: minutesFromSeconds(pace),
        paceSeconds: secondsFromSeconds(pace)
      }
    }
  }
  return initialState;
};
