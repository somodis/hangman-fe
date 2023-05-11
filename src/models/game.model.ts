import { WordModel } from './words.model';

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
export interface ResponseGameModel {
  id: number;
  guessedLetters: string;
  word: WordModel;
  wordId: number;
  userId: number;
}
export interface AutoSaveGameModel {
  id: number;
  guessedLetters: string[];
  wordId?: number;
  userId?: number;
}

export interface WinOrLossModel {
  isWinner: boolean | undefined;
  isLoser: boolean | undefined;
}
