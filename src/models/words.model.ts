import { DifficultyLevel } from './game.model';

export interface WordModel {
  id: number;
  word: string;
  wordLength: number;
  difficulty: DifficultyLevel;
}

export interface addWordResponse {
  errors: string | null;
  word: WordModel;
}
