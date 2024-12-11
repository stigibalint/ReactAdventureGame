import React, { useState } from "react";
import { generateNewCharacter, getPlayerState, makeChoice, PlayerState } from "./api";
import "./App.css";

function App() {
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCharacter = async () => {
    try {
      const newPlayerState = await generateNewCharacter();
      setPlayerState(newPlayerState);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleGetStatus = async () => {
    if (!playerState) return;
    try {
      const updatedState = await getPlayerState(playerState.player_id);
      setPlayerState(updatedState);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleMakeChoice = async (choiceId: number) => {
    if (!playerState) return;
    try {
      const updatedState = await makeChoice(playerState.player_id, choiceId);
      setPlayerState(updatedState);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="container">
      <h1>Adventure Game</h1>
      {error && <p className="error">{error}</p>}
      {!playerState ? (
        <button onClick={handleGenerateCharacter}>Generate New Character</button>
      ) : (
        <div>
          <div className="location">
            <h2>{playerState.current_location.name}</h2>
            <p>{playerState.current_location.description}</p>
            <img src={playerState.current_location.image} alt="Location" />
          </div>
          <ul>
            {playerState.current_location.choices.map((choice) => (
              <li key={choice.id}>
                <button onClick={() => handleMakeChoice(choice.id)}>{choice.text}</button>
              </li>
            ))}
          </ul>
          <div className="stats">
            <p>Health: {playerState.health}</p>
            <p>Items: {playerState.items.join(", ") || "None"}</p>
          </div>
          <button onClick={handleGetStatus}>Get Status</button>
        </div>
      )}
    </div>
  );
}

export default App;
