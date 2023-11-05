import PropTypes from "prop-types";
import "../styles/GameCard.css";
import cardBackImg from "../assets/icons/card-back.png";

export default function GameCard({ imageUrl, isFlipped, setFlipped, pokemonName, isClickEnabled, gameInfo }) {
  function handleFlip() {
    if (isClickEnabled && !gameInfo.isGameOver) {
      setFlipped(!isFlipped);
    }
  }
  return (
    <div className="card-container">
      <div className={`card ${isFlipped || gameInfo.isGameOver ? "flipped" : ""}`} onClick={handleFlip}>
        <div className="card-front">
          <img src={imageUrl} alt="Memory Card" draggable="false"></img>
          <div className="img-info">{`${pokemonName}`}</div>
        </div>
        <div className="card-back">
          <img src={cardBackImg} draggable="false"></img>
        </div>
      </div>
    </div>
  );
}

GameCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  setFlipped: PropTypes.func.isRequired,
  pokemonName: PropTypes.string.isRequired,
  isClickEnabled: PropTypes.bool.isRequired,
  gameInfo: PropTypes.object.isRequired,
};
