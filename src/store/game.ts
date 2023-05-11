import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DifficultyLevel, GameModel, ResponseGameModel, WinOrLossModel } from '../models/game.model';
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
  isWinner: boolean | undefined;
  isLoser: boolean | undefined;
}

const initialState = {
  gameId: null,
  gameInProgress: false,
  selectedDifficulty: null,
  wordToGuess: null,
  guessedLetters: [],
  mistakes: 0,
  isWinner: false,
  isLoser: false,
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
    setWinOrLoss: (state, action: PayloadAction<WinOrLossModel>) => {
      state.isWinner = action.payload.isWinner;
      state.isLoser = action.payload.isLoser;
    },
    resetGame: () => initialState,
    resumeGame: (state, action: PayloadAction<ResponseGameModel>) => {
      const fetchedGame = action.payload;
      state.gameId = fetchedGame.id;
      state.gameInProgress = true;
      state.selectedDifficulty = DifficultyLevel.EASY; // TODO !!
      state.wordToGuess = fetchedGame.word;
      const guessedLetterArray = fetchedGame.guessedLetters.split(',');
      state.guessedLetters = guessedLetterArray;
      state.mistakes = 0; // TODO !!
    },
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

export const initGame = () => async (dispatch: AppDispatch) => {
  const user = store.getState().profile.profile;

  if (!user || !user.isInGame) {
    return;
  }

  const game = await gameService.getGame(user.id);

  dispatch(actions.resumeGame(game));
};

export const guess =
  ({ letter }: { letter: string }) =>
  async (dispatch: AppDispatch) => {
    if (store.getState().game.isWinner || store.getState().game.isLoser) {
      return;
    }
    dispatch(addGuessedLetter(letter));

    const { gameId, guessedLetters } = store.getState().game;
    const user = store.getState().profile.profile;
    if (!gameId || !user) {
      return;
    }
    await gameService.autoSaveGame({ id: gameId, userId: user.id, guessedLetters: guessedLetters });

    const isLoser = store.getState().game.mistakes === 6;
    const isWinner = store
      .getState()
      .game.wordToGuess?.word.split('')
      .every((letter) => selectGuessedLetters(store.getState()).includes(letter));

    if (isLoser || isWinner) {
      dispatch(actions.setWinOrLoss({ isWinner, isLoser }));
    }
  };

export const endGame = (isWinner: boolean | undefined, type?: 'new' | 'end') => async (dispatch: AppDispatch) => {
  const user = store.getState().profile.profile;

  if (!user) {
    return;
  }

  if (isWinner) {
    await userService.saveUserScore(user.id, user.score + 1);
  }

  const prevDifficulty = store.getState().game.selectedDifficulty;

  await dispatch(setUserInGame(false));
  dispatch(actions.resetGame());

  if (prevDifficulty && type === 'new') {
    dispatch(actions.setDifficulty(prevDifficulty));
    await dispatch(getWord({ level: prevDifficulty }));
    await dispatch(setGame());
  }
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

export const selectWin = (state: ApplicationState) => {
  return state.game.isWinner;
};

export const selectLoss = (state: ApplicationState) => {
  return state.game.isLoser;
};
