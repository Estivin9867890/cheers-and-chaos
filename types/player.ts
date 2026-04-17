export interface Player {
  id: string;
  name: string;
  color: string;
  drinkCount: number;
}

export interface PlayerStats {
  playerId: string;
  totalSips: number;
  gamesWon: number;
  bluffsSuccessful: number;
  bluffsCaught: number;
}
