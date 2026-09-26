import { useEffect, useState } from 'react';
import './App.css';

const questions = [
  { text: '日本の首都は東京である。', answer: '○' },
  { text: '1年は365日である。', answer: '○' },
  { text: 'ペンギンは空を飛べる。', answer: '×' },
  { text: '太陽は西から昇る。', answer: '×' },
  { text: '水は0℃で凍る。', answer: '○' },
];

const getSavedBestScore = () => {
  try {
    return Number(localStorage.getItem('marubatsu-best-score')) || 0;
  } catch {
    return 0;
  }
};

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(getSavedBestScore);

  useEffect(() => {
    try {
      localStorage.setItem('marubatsu-best-score', String(bestScore));
    } catch {
      // クイズはlocalStorageが使えない環境でも続けられます。
    }
  }, [bestScore]);

  const question = questions[questionIndex];
  const isAnswered = selectedAnswer !== null;
  const isCorrect = isAnswered && selectedAnswer === question.answer;
  const isFinished = questionIndex === questions.length - 1 && isAnswered;

  const chooseAnswer = (answer) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    if (answer === question.answer) {
      const nextScore = score + 1;
      setScore(nextScore);
      setBestScore((currentBest) => Math.max(currentBest, nextScore));
    }
  };

  const goToNextQuestion = () => {
    if (questionIndex === questions.length - 1) {
      setQuestionIndex(0);
      setScore(0);
    } else {
      setQuestionIndex((currentIndex) => currentIndex + 1);
    }
    setSelectedAnswer(null);
  };

  return (
    <main className="quiz-page">
      <section className={`quiz-card${isAnswered ? (isCorrect ? ' is-correct' : ' is-incorrect') : ''}`}>
        <header className="quiz-header">
          <div className="brand-mark" aria-hidden="true">○</div>
          <p className="eyebrow">QUICK BRAIN BREAK</p>
          <h1>マルバツクイズ</h1>
          <p className="intro">ひらめいた答えを選んでみよう。</p>
        </header>

        <div className="quiz-meta">
          <span className="question-count">
            QUESTION <strong>{String(questionIndex + 1).padStart(2, '0')}</strong>
            <span className="question-total"> / {String(questions.length).padStart(2, '0')}</span>
          </span>
          <span className="score-pill">正解 {score} 問</span>
        </div>

        <div className="progress-track" aria-label={`全${questions.length}問中${questionIndex + 1}問目`}>
          <span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
        </div>

        <div className="question-box" aria-live="polite">
          <span className="question-label">問題</span>
          <p>{question.text}</p>
        </div>

        <div className="answer-area" aria-label="答えを選択">
          {['○', '×'].map((answer) => (
            <button
              className={`answer-button answer-${answer === '○' ? 'circle' : 'cross'}${selectedAnswer === answer ? ' is-picked' : ''}`}
              key={answer}
              type="button"
              onClick={() => chooseAnswer(answer)}
              disabled={isAnswered}
              aria-label={`${answer}を選ぶ`}
            >
              {answer}
            </button>
          ))}
        </div>

        {isAnswered ? (
          <div className="result-area" role="status" aria-live="polite">
            <span className="result-icon" aria-hidden="true">{isCorrect ? '✓' : '↗'}</span>
            <div>
              <p className="result-title">{isCorrect ? '正解！' : '不正解'}</p>
              <p className="result-detail">
                正しい答えは <strong>{question.answer}</strong> です。
              </p>
            </div>
          </div>
        ) : (
          <p className="answer-hint">○ か × をタップして回答</p>
        )}

        {isAnswered && (
          <button className="next-button" type="button" onClick={goToNextQuestion}>
            {isFinished ? 'もう一度挑戦' : '次の問題'}
            <span aria-hidden="true">→</span>
          </button>
        )}

        <footer className="quiz-footer">
          <span>BEST SCORE</span>
          <strong>{bestScore} <small>/ {questions.length}</small></strong>
          <span className="footer-divider" aria-hidden="true" />
          <span>最高スコアは自動保存されます</span>
        </footer>
      </section>
      <p className="page-caption">考えすぎず、直感で答えてみて。</p>
    </main>
  );
}

export default App;
