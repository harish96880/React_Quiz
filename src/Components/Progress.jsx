export default function Progress({
  index,
  numQuestions,
  points,
  totalPossiblePoints,
  answer,
}) {
  return (
    <>
      <center>
        <progress
          className="progress-bar"
          max={numQuestions}
          value={index + Number(answer !== null)}
        />
      </center>
      <div className="progress">
        <p>
          Question <strong>{index + 1}</strong> / {numQuestions}
        </p>
        <p>
          Points <strong>{points}</strong> / {totalPossiblePoints}
        </p>
      </div>
    </>
  );
}
