import {useState, useEffect} from "react"
import quizArray from "./quizArray"
import QuestionBox from "./components/QuestionBox"
import Result from "./components/Result"

function App() {

  const [questionBank, setQuestionBank] = useState([]);
  const [score, setScore] = useState(0);
  const [responses, setResponses] = useState(0);

  const getQuestion = () => {
    quizArray()
      .then(question => {setQuestionBank(question)})
  }

  useEffect(() => {
   getQuestion()
  }, [])

  const computeAnswer = (userAnswer, correct) => {
    if(userAnswer === correct){
      setScore(score+1)
    }
    setResponses(responses < 5 ? responses + 1 : 5)
  }

  const playAgain = () => {
    getQuestion();
    setScore(0);
    setResponses(0);
  }



  return (
    <div className="container">
      <div className="title">Quiz App</div>
      {questionBank.length > 0 && responses < 5 &&
       questionBank.map(({question, answers,correct, questionId }) => (
         <QuestionBox question={question} options={answers} key={questionId} selected={userAnswer => computeAnswer(userAnswer, correct)} />
       ))
      }
      {
        responses === 5 ? <Result score={score} playAgain={playAgain} /> : null
      }
    </div>
  );
}

export default App;
