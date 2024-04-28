export default function FinishQuiz({
  points,
  totalPossiblePoints,
  dispatch,
  highscore,
}) {
  const percentage = Math.ceil((points / totalPossiblePoints) * 100);
  return (
    <div className="finish-quiz">
      <center>
        <h2>You finished the react quiz🎉</h2>
        <h3>
          😊Scored {points} out of {totalPossiblePoints} ({percentage} %)
        </h3>
        <h3>(Highscore: {highscore})</h3>
        <button
          className="btn"
          onClick={() => dispatch({ type: "restart" })}
          style={{ float: "none" }}
        >
          Restart Quiz
        </button>
      </center>
    </div>
  );
}
