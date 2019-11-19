import { useState, useEffect } from "react";

/**
 * Keeps track of the state of the shift key
 */
export const useShiftKey = () => {
    const [shiftDown, setShiftDown] = useState(false);
    useEffect(() => {
      // Keep track of the shift key
      const upHandler = e => {
        if (e.keyCode === 16) setShiftDown(false);
      };
      const downHandler = e => {
        if (e.keyCode === 16) setShiftDown(true);
      };
  
      document.addEventListener("keydown", downHandler);
      document.addEventListener("keyup", upHandler);
  
      // Remove event listeners on cleanup
      return () => {
        document.removeEventListener("keydown", downHandler);
        document.removeEventListener("keyup", upHandler);
      };
    }, []);
    return shiftDown;
  };