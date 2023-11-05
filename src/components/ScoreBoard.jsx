import PropTypes from "prop-types";
export default function ScoreBoard({ scoreBoard }) {
  return (
    <div className="score-board">
      <div className="score">Score : {scoreBoard.score}</div>
      <div className="best-score">Best Score : {scoreBoard.bestScore}</div>
    </div>
  );
}

ScoreBoard.propTypes = {
  scoreBoard: PropTypes.object.isRequired,
};
