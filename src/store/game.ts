import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DifficultyLevel, ResponseGameModel, WinOrLossModel } from '../models/game.model';
import { gameService, userService, wordService } from '../services';
import { setUserInGame } from './profile';
import store from '.';
import { WordModel } from '../models';
import { checkIfLost, checkIfWon } from '../utils/check-win-or-loss';

export interface GameState {
  gameId: number | null;
  gameInProgress: boolean;
  selectedDifficulty: DifficultyLevel | null;
  wordToGuess: WordModel | null;
  guessedLetters: string[];
  mistakes: number;
  isWinner: boolean | undefined;
  isLoser: boolean | undefined;
  isLoading: boolean;
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
  isLoading: false,
} as GameState;

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameInProgress: (state, action: PayloadAction<boolean>) => {
      state.gameInProgress = action.payload;
    },
    setIsGameLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setGameId: (state, action: PayloadAction<number>) => {
      state.gameId = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<DifficultyLevel | null>) => {
      state.selectedDifficulty = action.payload;
    },
    setWordToGuess: (state, action: PayloadAction<WordModel>) => {
      state.guessedLetters = [];
      const wordData = { ...action.payload, word: action.payload.word.toLowerCase() };
      state.wordToGuess = wordData;
    },
    setWinOrLoss: (state, action: PayloadAction<WinOrLossModel>) => {
      state.isWinner = action.payload.isWinner;
      state.isLoser = action.payload.isLoser;
    },
    resetGame: () => initialState,
    resumeGame: (state, action: PayloadAction<ResponseGameModel>) => {
      const fetchedGame = action.payload;

      if (!fetchedGame) {
        return;
      }

      const guessedLetterArray = fetchedGame.guessedLetters?.split(',') || [];

      state.gameId = fetchedGame.id;
      state.selectedDifficulty = fetchedGame.word?.difficulty;
      state.guessedLetters = guessedLetterArray;
      state.wordToGuess = fetchedGame.word;
      state.gameInProgress = true;
      state.mistakes = fetchedGame.mistakes;
      state.isWinner = checkIfWon(fetchedGame.word.word, guessedLetterArray);
      state.isLoser = checkIfLost(fetchedGame.mistakes);
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
export const { resetGame } = actions;

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

  // await dispatch(actions.setIsGameLoading(true));
  const game = await gameService.startGame({
    userId: user.id,
    wordId: word.id,
    mistakes: 0,
    isInProgress: true,
    guessedLetters: [],
  });
  // await dispatch(actions.setIsGameLoading(false));

  await dispatch(setUserInGame(true));
  await dispatch(actions.setGameInProgress(true));
  await dispatch(actions.setGameId(game.id));
};

export const initGame = () => async (dispatch: AppDispatch) => {
  const user = store.getState().profile.profile;

  if (!user || !user.isInGame) {
    return;
  }

  const game = await gameService.getGame(user.id);
  await dispatch(actions.resumeGame(game));
};

export const guess =
  ({ letter }: { letter: string }) =>
  async (dispatch: AppDispatch) => {
    const { gameId, wordToGuess } = store.getState().game;
    const user = store.getState().profile.profile;

    await dispatch(addGuessedLetter(letter));

    const { mistakes, guessedLetters } = store.getState().game;

    if (!gameId || !user || !wordToGuess) {
      // if (!user || !wordToGuess) {
      return;
    }

    await gameService.autoSaveGame({
      id: gameId,
      userId: user.id,
      guessedLetters,
      isInProgress: true,
      mistakes,
      wordId: wordToGuess.id,
    });

    dispatch(
      actions.setWinOrLoss({ isWinner: checkIfWon(wordToGuess?.word, guessedLetters), isLoser: checkIfLost(mistakes) })
    );
  };

export const endGame = (type?: 'new' | 'end') => async (dispatch: AppDispatch) => {
  const user = store.getState().profile.profile;
  const { gameId, wordToGuess, selectedDifficulty, ...game } = store.getState().game;

  if (!user || !gameId) {
    return;
  }

  if (game.isWinner) {
    await userService.saveUserScore(user.id, user.score + 1);
    // await dispatch(s) todo : set user score
  }

  const prevDifficulty = selectedDifficulty;

  await dispatch(setUserInGame(false));

  await gameService.endGame({ ...game, id: gameId, isInProgress: false, wordId: wordToGuess?.id, userId: user.id });

  await dispatch(actions.resetGame());

  if (prevDifficulty && type === 'new') {
    dispatch(actions.setDifficulty(prevDifficulty));
    await dispatch(getWord({ level: prevDifficulty }));
    await dispatch(setGame());
  }
};

export const selectGameState = (state: ApplicationState) => state.game.gameInProgress;

export const selectDifficultyLevel = (state: ApplicationState) => state.game.selectedDifficulty;

export const selectWordToGuess = (state: ApplicationState) => state.game.wordToGuess;

export const selectGuessedLetters = (state: ApplicationState) => state.game.guessedLetters;

export const selectMistakeCount = (state: ApplicationState) => state.game.mistakes;

export const selectWin = (state: ApplicationState) => state.game.isWinner;

export const selectLoss = (state: ApplicationState) => state.game.isLoser;
export const selectIsGameLoading = (state: ApplicationState) => state.game.isLoading;
