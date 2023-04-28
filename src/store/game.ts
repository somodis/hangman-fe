import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DifficultyLevel } from '../models/game.model';
import { getWord } from '../utils/words';

export interface GameState {
  gameInProgress: boolean;
  selectedDifficulty: DifficultyLevel | null;
  wordToGuess: string;
  guessedLetters: string[];
  mistakes: number;
  isLoser: boolean;
  isWinner: boolean;
}

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    gameInProgress: false,
    selectedDifficulty: null,
    wordToGuess: getWord(),
    guessedLetters: [],
    mistakes: 0,
    isLoser: false,
    isWinner: false,
  } as GameState,
  reducers: {
    setGame: (state) => {
      console.log('startgame set');

      state.gameInProgress = true;
    },
    setDifficulty: (state, action: PayloadAction<DifficultyLevel | null>) => {
      state.selectedDifficulty = action.payload;
    },
    setWordToGuess: (state) => {
      state.guessedLetters = [];
      state.wordToGuess = getWord();
    },
    addGuessedLetter: (state, action: PayloadAction<string>) => {
      const letter = action.payload;
      if (state.guessedLetters.includes(letter) || state.isLoser || state.isWinner) {
        return;
      }
      if (!state.wordToGuess.includes(letter)) {
        state.mistakes += 1;
      }
      state.guessedLetters = [...state.guessedLetters, letter];
    },
  },
});

const { actions } = gameSlice;

export const gameReducer = gameSlice.reducer;

export const { setGame, setDifficulty, setWordToGuess, addGuessedLetter } = actions;

export const selectGameState = (state: ApplicationState) => {
  return state.game.gameInProgress;
};

export const selectDifficultyLevel = (state: ApplicationState) => {
  return state.game.selectedDifficulty;
};

export const selectWordToGuess = (state: ApplicationState) => {
  return state.game.wordToGuess;
};

export const selectGuessedLetters = (state: ApplicationState) => {
  return state.game.guessedLetters;
};

export const selectMistakeCount = (state: ApplicationState) => {
  return state.game.mistakes;
};
