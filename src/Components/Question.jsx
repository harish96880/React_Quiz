import "../styles.css";
import Timer from "./Timer";

export default function Question({
  question,
  dispatch,
  answer,
  index,
  numQuestions,
  secondsRemaining,
}) {
  const hasAnswered = answer !== null;

  return (
    <div className="question-container">
      <h2>{question.question}</h2>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={hasAnswered}
            className={`option-btn ${index === answer ? "answer" : ""} ${hasAnswered ? (index === question.correctOption ? "correct" : "wrong") : ""}`}
          >
            {option}
          </button>
        ))}
      </div>
      {/* <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} /> */}
      {hasAnswered && (
        <div className="access-btns">
          {index < numQuestions - 1 ? (
            <button
              className={`btn`}
              onClick={() => dispatch({ type: "nextQuestion" })}
            >
              Next
            </button>
          ) : (
            <button
              className={`btn finish-btn`}
              onClick={() => dispatch({ type: "finished" })}
            >
              Finish
            </button>
          )}
        </div>
      )}
    </div>
  );
}
