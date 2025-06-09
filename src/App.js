import React, { useState } from "react";
import styles from "./App.module.scss";
import bossImage from "./boss.jpg";

const initRotations = [45, 90, 135, 180, 225, 270, 315];
const ROTATIONS_ANGELS = [90, 180, 270];

const App = () => {
  const [barsRotation, setBarsRotation] = useState(initRotations);
  const [isRotated, setIsRotated] = useState(false);
  const [activeBar, setActiveBar] = useState(
    Array(initRotations.length).fill(false)
  );
  const [clickedDegree, setClickedDegree] = useState(null);

  const reset = () => {
    setActiveBar([]);
    setIsRotated(false);
    setBarsRotation(initRotations);
    setClickedDegree(null);
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
    setClickedDegree(degree);
  };

  return (
    <div className={styles.app}>
      <button className={styles.reset} onClick={reset}>
        Reset
      </button>
      <div className={styles.circle}>
        <img src={bossImage} alt="boss" />
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
            className={clickedDegree === degree ? styles.activeButton : ""}
          >
            {degree}
          </button>
        ))}
      </div>
      <div className={styles.footer}>
        By 鹹魚
      </div>
    </div>
  );
};

export default App;
