import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DifficultyLevel } from '../models/game.model';
import { gameService, userService, wordService } from '../services';
import { setUserInGame } from './profile';
import store from '.';
import { WordModel } from '../models';

export interface GameState {
  gameId: number | null;
  gameInProgress: boolean;
  selectedDifficulty: DifficultyLevel | null;
  wordToGuess: WordModel | null;
  guessedLetters: string[];
  mistakes: number;
}

const initialState = {
  gameId: null,
  gameInProgress: false,
  selectedDifficulty: null,
  wordToGuess: null,
  guessedLetters: [],
  mistakes: 0,
} as GameState;

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameInProgress: (state, action: PayloadAction<boolean>) => {
      state.gameInProgress = action.payload;
    },
    setGameId: (state, action: PayloadAction<number>) => {
      state.gameId = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<DifficultyLevel | null>) => {
      state.selectedDifficulty = action.payload;
    },
    setWordToGuess: (state, action: PayloadAction<WordModel>) => {
      state.guessedLetters = [];
      const wordData = { ...action.payload, word: action.payload.word.toUpperCase() };
      state.wordToGuess = wordData;
    },
    resetGame: () => initialState,
    addGuessedLetter: (state, action: PayloadAction<string>) => {
      const letter = action.payload;
      if (state.guessedLetters.includes(letter)) {
        return;
      }
      if (!state.wordToGuess?.word.includes(letter)) {
        state.mistakes += 1;
      }
      state.guessedLetters = [...state.guessedLetters, letter];
    },
  },
});

const { actions } = gameSlice;

export const gameReducer = gameSlice.reducer;

export const { setDifficulty, addGuessedLetter } = actions;

export const getWord =
  ({ level }: { level: DifficultyLevel }) =>
  async (dispatch: AppDispatch) => {
    const word = await wordService.getRandomWord(level);

    dispatch(actions.setWordToGuess(word));

    return word;
  };

export const setGame = () => async (dispatch: AppDispatch) => {
  const user = store.getState().profile.profile;
  const word = store.getState().game.wordToGuess;

  if (!user || !word) {
    return;
  }

  const game = await gameService.startGame({ userId: user.id, wordId: word.id });

  await dispatch(setUserInGame(true));
  dispatch(actions.setGameInProgress(true));
  dispatch(actions.setGameId(game.id));
};

export const guess =
  ({ letter }: { letter: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch(addGuessedLetter(letter));

    const { gameId, guessedLetters } = store.getState().game;
    const user = store.getState().profile.profile;
    if (!gameId || !user) {
      return;
    }
    await gameService.autoSaveGame({ id: gameId, userId: user.id, guessedLetters: guessedLetters });

    const isWinner = selectWordToGuess(store.getState())
      ?.word.split('')
      .every((letter) => selectGuessedLetters(store.getState()).includes(letter));
    const isLoser = selectMistakeCount(store.getState()) === 6;

    if (isLoser || isWinner) {
      dispatch(endGame(isWinner));
    }
  };

export const endGame = (isWinner: boolean | undefined) => async (dispatch: AppDispatch) => {
  const user = store.getState().profile.profile;

  if (!user) {
    return;
  }

  if (isWinner) {
    await userService.saveUserScore(user.id, user.score + 1);
  }

  await dispatch(setUserInGame(false));
  dispatch(actions.resetGame());
};

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
