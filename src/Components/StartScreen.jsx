import "../styles.css";

export default function StartScreen({ numQuestions, onHandleStart }) {
  return (
    <div>
      <h1>Welcome to react mastery quiz⭐</h1>
      <h4>
        Here you have <span className="round">{numQuestions}</span> questions to
        know about your self in react
      </h4>
      <center>
        <button className="start-btn" onClick={() => onHandleStart()}>
          Let's Start
        </button>
      </center>
    </div>
  );
}
