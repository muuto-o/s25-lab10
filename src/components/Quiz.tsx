import React, { useState } from "react";
import "./Quiz.css";
import QuizCore from "../core/QuizCore";

const quizCore = new QuizCore();

const Quiz: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showScore, setShowScore] = useState(false);

  const currentQuestion = quizCore.getCurrentQuestion();

  const handleOptionSelect = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleButtonClick = () => {
    if (selectedAnswer) {
      quizCore.answerQuestion(selectedAnswer);
    }

    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion();
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <div className="quiz-container score-screen">
        <h2 className="score-title">Quiz Completed!</h2>
        <div className="score-value">
          {quizCore.getScore()}
          <span>/{quizCore.getTotalQuestions()}</span>
        </div>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${
              (quizCore.getCurrentQuestionIndex() /
                quizCore.getTotalQuestions()) *
              100
            }%`,
          }}
        ></div>
      </div>

      <div className="question-card">
        <div className="question-number">
          Question {quizCore.getCurrentQuestionIndex() + 1} of{" "}
          {quizCore.getTotalQuestions()}
        </div>
        <h2 className="question-text">{currentQuestion?.question}</h2>
      </div>

      <div className="options-grid">
        {currentQuestion?.options.map((option, index) => (
          <div
            key={option}
            className={`option-card ${
              selectedAnswer === option ? "selected" : ""
            } option-${index + 1}`}
            onClick={() => handleOptionSelect(option)}
          >
            <div className="option-content">
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        className={`submit-button ${selectedAnswer ? "active" : ""}`}
        onClick={handleButtonClick}
        disabled={!selectedAnswer}
      >
        {quizCore.hasNextQuestion() ? "Next Question" : "Submit Quiz"}
      </button>
    </div>
  );
};

export default Quiz;
