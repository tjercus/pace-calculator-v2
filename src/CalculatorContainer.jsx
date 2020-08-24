import React, { useReducer } from "react";
import { calculatorReducer, initialState } from "./calculatorReducer";
import {calculateDistanceAction, calculatePaceAction, calculateTimeAction, changeDataAction} from "./calculatorActions";

const CalculatorContainer = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const onChangeData = (evt) => {
    console.log("onChangeData", evt.target.name, evt.target.value);
    dispatch(changeDataAction(evt.target.name, evt.target.value));
  };

  return (
    <div id={"calculator-container"}>
      <div id={"time-row"}>
        {"Time (hms):"}
        <input
          type={"text"}
          id={"time-hours"}
          name={"timeHours"}
          value={state.timeHours}
          onChange={onChangeData}
        />
        <input
          type={"text"}
          id={"time-minutes"}
          name={"timeMinutes"}
          value={state.timeMinutes}
          onChange={onChangeData}
        />
        <input
          type={"text"}
          id={"time-seconds"}
          name={"timeSeconds"}
          value={state.timeSeconds}
          onChange={onChangeData}
        />
        <button onClick={() => dispatch(calculateTimeAction())}>
          {"Calculate Time"}
        </button>
      </div>
      <div id={"distance-row"}>
        {"Distance (meters):"}
        <input
          type={"text"}
          id={"distance"}
          name={"distance"}
          value={state.distance}
          onChange={onChangeData}
        />
        <button onClick={() => dispatch(calculateDistanceAction())}>
          {"Calculate Distance"}
        </button>
      </div>
      <div id={"pace-row"}>
        {"Pace (hms):"}
        <input
          type={"text"}
          id={"pace-hours"}
          name={"paceHours"}
          value={state.paceHours}
          onChange={onChangeData}
        />
        <input
          type={"text"}
          id={"pace-minutes"}
          name={"paceMinutes"}
          value={state.paceMinutes}
          onChange={onChangeData}
        />
        <input
          type={"text"}
          id={"pace-seconds"}
          name={"paceSeconds"}
          value={state.paceSeconds}
          onChange={onChangeData}
        />
        <button onClick={() => dispatch(calculatePaceAction())}>
          {"Calculate Pace"}
        </button>
      </div>

    </div>
  );
};

export default CalculatorContainer;
