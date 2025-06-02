import React, { useState } from "react";
import styles from "./App.module.scss";

const initRotations = [45, 90, 135, 180, 225, 270, 315];
const ROTATIONS_ANGELS = [90, 180, 270];

const App = () => {
  const [barsRotation, setBarsRotation] = useState(initRotations);
  const [isRotated, setIsRotated] = useState(false);
  const [activeBar, setActiveBar] = useState(
    Array(initRotations.length).fill(false)
  );

  const reset = () => {
    setActiveBar([]);
    setIsRotated(false);
    setBarsRotation(initRotations);
  };

  const handleBarOnClick = (i) => {
    setActiveBar((prev) => {
      const newPrev = [...prev];
      newPrev[i] = !newPrev[i];
      return newPrev;
    });
  };

  const handleRotationOnClick = (degree) => {
    const newRotations = barsRotation.map((deg) => deg + degree);
    setBarsRotation(newRotations);
    setIsRotated(true);
  };

  return (
    <div className={styles.app}>
      <button className={styles.reset} onClick={reset}>
        Reset
      </button>
      <div className={styles.circle}>
        {barsRotation.map((degree, i) => (
          <div
            className={styles.rotateContainer}
            style={{ transform: `rotate(${degree}deg)` }}
          >
            <button
              className={`${styles.bar} ${activeBar[i] ? styles.active : ""}`}
              style={isRotated && !activeBar[i] ? { display: "none" } : {}}
              onClick={() => handleBarOnClick(i)}
            />
          </div>
        ))}
      </div>
      <div className={styles.rotationButtons}>
        {ROTATIONS_ANGELS.map((degree) => (
          <button
            key={degree}
            disabled={isRotated}
            onClick={() => handleRotationOnClick(degree)}
          >
            {degree}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
