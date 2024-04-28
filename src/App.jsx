import Header from "./Components/Header";
import Main from "./Components/Main";
import StartScreen from "./Components/StartScreen";
import "./styles.css";
import { useEffect, useReducer } from "react";
import { questions } from "../data/questions.json";
import Question from "./Components/Question";
import Progress from "./Components/Progress";
import FinishQuiz from "./Components/FinishQuiz";

export default function App() {
  function reducer(state, action) {
    switch (action.type) {
      case "dataRecieved":
        return { ...state, questionsData: action.payload, status: "ready" };
      case "dataFailed":
        return { ...state, status: "error" };
      case "startHandling":
        return { ...state, status: "active" };
      case "newAnswer":
        const question = state.questionsData.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      case "nextQuestion":
        return { ...state, index: state.index + 1, answer: null };
      case "finished":
        return {
          ...state,
          answer: null,
          status: "finished",
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };
      case "restart":
        return {
          ...initialState,
          questionsData: state.questionsData,
          status: "ready",
        };
      case "tick":
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "finished" : state.status,
        };
      default:
        return new Error("Unknown");
    }
  }

  const initialState = {
    questionsData: [],
    status: "loading",
    index: 0, //loading, error, ready, active, finished
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: 10,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "dataRecieved", payload: questions });
  }, []);

  const {
    questionsData,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;
  const numQuestions = questionsData.length;
  const totalPossiblePoints = questionsData.reduce(
    (prev, curr) => prev + curr.points,
    0,
  );

  const handleStart = () => {
    dispatch({ type: "startHandling" });
  };
  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <p>Questions are loading...</p>}
        {status === "error" && <p>Problem in retrieval, try again!!</p>}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            onHandleStart={handleStart}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              totalPossiblePoints={totalPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              points={points}
              index={index}
              numQuestions={numQuestions}
              secondsRemaining={secondsRemaining}
            />
          </>
        )}
        {status === "finished" && (
          <FinishQuiz
            points={points}
            totalPossiblePoints={totalPossiblePoints}
            dispatch={dispatch}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}
