export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface GameModel {
  id: number;
  guessedLetters: string[];
  wordId: number;
  userId: number;
}
export interface StartGameModel {
  guessedLetters?: string[];
  wordId: number;
  userId: number;
}

export interface AutoSaveGameModel {
  id: number;
  guessedLetters: string[];
  wordId?: number;
  userId?: number;
}
