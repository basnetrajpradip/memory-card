import PropTypes from "prop-types";
import "../styles/GameOver.css";
export default function GameOver({ gameInfo, bestScore, resetGame }) {
  function handlePlayAgain() {
    resetGame();
  }

  return (
    <div className="game-over-screen">
      <div className="game-over-window">
        <div className="game-info">
          {gameInfo.haveWon && (
            <div className="game-won">
              <div>You Won :)</div>
            </div>
          )}
          {!gameInfo.haveWon && (
            <div className="game-lost">
              <div>You Lost :(</div>
            </div>
          )}
          <div className="game-score">
            <div className="current-score">↪ Current score : {gameInfo.gameScore}</div>
            <div className="best-score">🏆 Best score : {bestScore}</div>
          </div>
          <div className="play-again">
            <button onClick={handlePlayAgain}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>reload</title>
                <path d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" />
              </svg>
              <div>Play again</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

GameOver.propTypes = {
  gameInfo: PropTypes.object.isRequired,
  bestScore: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
};
