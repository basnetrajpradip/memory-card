import { useEffect, useState } from "react";
import { PageHeader, ScoreBoard, GameCard, GameOver } from "./components";
import "./styles/App.css";
import _ from "underscore";
import fetchPokemonData from "./data/fetchData";

export default function App() {
  const [isFlipped, setFlipped] = useState(false);
  const [pokemonList, setpokemonList] = useState([]);
  const [isClickEnabled, setClickEnabled] = useState(true);
  const [scoreBoard, setScoreBoard] = useState({
    score: 0,
    bestScore: 0,
  });
  const [gameInfo, setGameInfo] = useState({
    isGameOver: false,
    haveWon: false,
    gameScore: 0,
  });

  useEffect(() => {
    // Fetch Pokémon data when the component mounts
    fetchPokemonData()
      .then((pokemonDataArray) => {
        setpokemonList(pokemonDataArray);
      })
      .catch((error) => {
        console.error("Error in fetchPokemonData:", error);
      });
  }, []);

  // Function to shuffle the Pokémon list
  function shufflePokemonList(data) {
    const shuffledArray = _.shuffle(data);
    setpokemonList(shuffledArray);
  }

  useEffect(() => {
    // Check if all card was remembered and game is won
    if (scoreBoard.score === 10) {
      setGameInfo({ ...gameInfo, isGameOver: true, haveWon: true, gameScore: 3 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scoreBoard.score]);

  function resetGame() {
    // Reset game-related state
    setScoreBoard({
      score: 0,
      bestScore: scoreBoard.bestScore, // keep the best score
    });

    setGameInfo({
      isGameOver: false,
      haveWon: false,
      gameScore: 0,
    });

    // Fetch new Pokémon data
    fetchPokemonData()
      .then((pokemonDataArray) => {
        setpokemonList(pokemonDataArray);
      })
      .catch((error) => {
        console.error("Error in fetchPokemonData:", error);
      });
  }

  function handleClick(event) {
    if (isClickEnabled) {
      const clickedCard = event.target.closest(".card-container");

      if (clickedCard && !gameInfo.isGameOver) {
        const clickedPokemon = clickedCard.querySelector(".img-info").textContent;
        pokemonList.forEach((pokemon) => {
          if (pokemon.name === clickedPokemon) {
            if (!pokemon.isClicked) {
              pokemon.isClicked = true;
              setScoreBoard((prevScore) => ({
                ...prevScore,
                score: prevScore.score + 1,
              }));
              if (scoreBoard.score >= scoreBoard.bestScore) {
                setScoreBoard((prevScore) => ({
                  ...prevScore,
                  bestScore: prevScore.score,
                }));
              }
            } else {
              setGameInfo({ ...gameInfo, isGameOver: true, gameScore: scoreBoard.score });
              pokemonList.forEach((pokemon) => {
                pokemon.isClicked = false;
              });
              setScoreBoard({ ...scoreBoard, score: 0 });
            }
          }
        });
        setClickEnabled(false);
        setTimeout(() => {
          shufflePokemonList(pokemonList);
          setFlipped(false);
        }, 1000);
        setTimeout(() => {
          setClickEnabled(true);
        }, 1800);
      }
    }
  }

  return (
    <>
      <PageHeader></PageHeader>
      <ScoreBoard scoreBoard={scoreBoard}></ScoreBoard>
      <div className="game-container" onClick={handleClick}>
        {pokemonList.map((pokemon, index) => (
          <GameCard key={index} imageUrl={pokemon.sprite} pokemonName={pokemon.name} isFlipped={isFlipped} setFlipped={setFlipped} isClickEnabled={isClickEnabled} gameInfo={gameInfo}></GameCard>
        ))}
      </div>
      {gameInfo.isGameOver && <GameOver gameInfo={gameInfo} bestScore={scoreBoard.bestScore} resetGame={resetGame}></GameOver>}
    </>
  );
}
