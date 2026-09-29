import { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [display, setDisplay] = useState("");

  const handlePress = (value) => {
    if (value === "AC") {
      setDisplay("");
      return;
    }

    if (value === "DEL") {
      setDisplay((prev) => prev.slice(0, -1));
      return;
    }

    if (value === "=") {
      if (!display) return;

      try {
        const result = Function(
          `"use strict"; return (${display
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-")})`
        )();

        setDisplay(String(result));
      } catch {
        setDisplay("Error");
      }
      return;
    }

    setDisplay((prev) => (prev === "Error" ? value : prev + value));
  };

  const buttons = [
    ["AC", "DEL", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    ["0", ".", "="]
  ];

  const isOperator = (v) =>
    ["÷", "×", "−", "+", "%"].includes(v);

  return (
    <div className="calculator-page">
      <div className="calculator">
        <h1>Calculator</h1>

        <div className="display">
          <span>{display}</span>
        </div>

        <div className="keypad">
          {buttons.map((row, i) => (
            <div className="button-row" key={i}>
              {row.map((btn) => {
                const isZero = btn === "0";
                const isEquals = btn === "=";
                const isFuncBtn =
                  btn === "AC" ||
                  btn === "DEL" ||
                  btn === "%" ||
                  isOperator(btn);

                return (
                  <button
                    key={btn}
                    onClick={() => handlePress(btn)}
                    className={[
                      "calc-button",
                      isZero ? "zero" : "",
                      isEquals
                        ? "equals"
                        : isFuncBtn
                        ? "function"
                        : "number"
                    ].join(" ")}
                  >
                    {btn}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
