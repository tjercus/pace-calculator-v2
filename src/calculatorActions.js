
export const calculateDistanceAction = () => {
  console.log("calculateDistanceAction");
  return { type: "CALC_DISTANCE_CMD" };
};

export const calculatePaceAction = () => {
  console.log("calculatePaceAction");
  return { type: "CALC_PACE_CMD" };
};

export const calculateTimeAction = () => {
  console.log("calculateTimeAction");
  return { type: "CALC_TIME_CMD" };
};

export const changeDataAction = (name, value) => ({
  type: "DATA_CHANGED_EVT",
  payload: { name, value: Number(value) },
});
