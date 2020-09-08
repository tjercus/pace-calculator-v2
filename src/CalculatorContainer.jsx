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
      <div id={"time-row"} className={"row"}>
        {"Time (hms):"}
        <input
          id={"time-hours"}
          name={"timeHours"}
          onChange={onChangeData}
          placeholder={"h"}
          type={"text"}
          value={state.timeHours}
        />
        <input
          id={"time-minutes"}
          name={"timeMinutes"}
          onChange={onChangeData}
          placeholder={"m"}
          type={"text"}
          value={state.timeMinutes}
        />
        <input
          id={"time-seconds"}
          name={"timeSeconds"}
          onChange={onChangeData}
          placeholder={"s"}
          type={"text"}
          value={state.timeSeconds}
        />
        <button onClick={() => dispatch(calculateTimeAction())}>
          {"Calculate"}
        </button>
      </div>
      <div id={"distance-row"} className={"row"}>
        {"Distance (meters):"}
        <input
          className={"large"}
          id={"distance"}
          name={"distance"}
          onChange={onChangeData}
          type={"text"}
          value={state.distance}
        />
        <button onClick={() => dispatch(calculateDistanceAction())}>
          {"Calculate"}
        </button>
      </div>
      <div id={"pace-row"} className={"row"}>
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
          {"Calculate"}
        </button>
      </div>

    </div>
  );
};

export default CalculatorContainer;
