import { useEffect } from "react";
import "../styles.css";

export default function Timer({ dispatch, secondsRemaining }) {
  useEffect(() => {
    setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
  }, [dispatch]);
  return <button className="timer">{secondsRemaining}</button>;
}
