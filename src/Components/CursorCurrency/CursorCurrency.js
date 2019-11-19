import React, { useState, useEffect } from "react";

import "./CursorCurrency.css";

const CursorCurrency = ({ selectedCurrency }) => {
  const [mousePos, setMousePos] = useState({ mouse_x: 0, mouse_y: 0 });

  useEffect(() => {
    const onMouseMovement = e => {
      const yPos = e.clientY + window.pageYOffset;
      const xPos = e.clientX + window.pageXOffset;
      setMousePos({ mouse_x: xPos, mouse_y: yPos });
    };
    // Update the document onMouseMove event using the browser API
    document.addEventListener("mousemove", onMouseMovement);

    return function cleanup() {
      document.removeEventListener("mousemove", onMouseMovement);
    };
  }, [selectedCurrency]);

  return (
    <img
      className="cursor-currency"
      src={selectedCurrency.selectedCurrencyImg}
      style={{
        left:
          selectedCurrency.selectedCurrency !== null
            ? mousePos.mouse_x - 10
            : "none",
        top:
          selectedCurrency.selectedCurrency !== null
            ? mousePos.mouse_y - 10
            : "none",
        display: selectedCurrency.selectedCurrencyImg ? "block" : "none"
      }}
      alt="pointer"
    />
  );
};

export default CursorCurrency;
