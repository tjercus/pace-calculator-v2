import React from "react";
import "./App.css";
import CalculatorContainer from "./CalculatorContainer";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        Pace calculator
      </header>
      <article className={"calculator-main"}>
        <CalculatorContainer />
      </article>
    </div>
  );
}

export default App;
