
export const API_BASE_URL = "https://8j1pzk0j-8000.euw.devtunnels.ms";


export interface CurrentLocation {
  name: string;
  description: string;
  image: string;
  choices: { id: number; text: string }[];
}

export interface PlayerState {
  player_id: string;
  current_location: CurrentLocation;
  health: number;
  items: string[];
}


export async function generateNewCharacter(): Promise<PlayerState> {
  const response = await fetch(`${API_BASE_URL}/api/start/`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to generate character: ${errorText}`);
  }
  return await response.json();
}


export async function getPlayerState(playerId: string): Promise<PlayerState> {
  const response = await fetch(`${API_BASE_URL}/api/state/${playerId}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch player state: ${errorText}`);
  }
  return await response.json();
}


export async function makeChoice(playerId: string, choiceId: number): Promise<PlayerState> {
  const response = await fetch(`${API_BASE_URL}/api/choose/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ player_id: playerId, choice_id: choiceId }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to make choice: ${errorText}`);
  }
  return await response.json();
}
