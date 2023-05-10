import { useProgress, useScroll } from "@react-three/drei";
import { useState } from "react";

export const Overlay = () => {
  const { progress } = useProgress();
  const [play, setPlay] = useState(false);

  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""} ${
        true ? "overlay--scrolled" : ""
      }`}
    >
      <div
        className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
      />
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className="logo">For Tracy</h1>
          <p className="intro__scroll">Scroll to begin your journey.</p>
          <button className="explore" onClick={() => setPlay(true)}>
            Explore
          </button>
        </div>
      )}
    </div>
  );
};
