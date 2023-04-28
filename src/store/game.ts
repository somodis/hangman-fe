import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DifficultyLevel } from "../models/game.model";
import { getWord } from "../utils/words";

export interface GameState {
    gameInProgress: boolean;
    selectedDifficulty: DifficultyLevel | null;
    wordToGuess: string;
    guessedLetters: string[];
    incorrectLetters: string[];
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
        incorrectLetters: [],
        isLoser: false,
        isWinner: false
    } as GameState,
    reducers: {
        setGame: (state) => {
            console.log('start game')
            state.gameInProgress = true;
            console.log(state.gameInProgress)
        },
        setDifficulty: (state, action: PayloadAction<DifficultyLevel | null>) => {
            console.log('new diff')
            state.selectedDifficulty = action.payload;
            console.log(state.selectedDifficulty)
        },        
        setWordToGuess: (state) =>{
            console.log('new word')
            state.guessedLetters = [];
            state.wordToGuess = getWord();
        },
        addGuessedLetter: (state, action: PayloadAction<string>) =>{
            const letter = action.payload;
            if (state.guessedLetters.includes(letter) || state.isLoser || state.isWinner) return;
            state.guessedLetters = [...state.guessedLetters, letter];
        }
    }
});

const {actions} = gameSlice;

export const gameReducer = gameSlice.reducer;

export const {setGame, setDifficulty, setWordToGuess, addGuessedLetter} = actions;

export const selectGameState = (state: ApplicationState) =>{
    return state.game.gameInProgress;
}

export const selectDifficultyLevel = (state: ApplicationState) =>{
    return state.game.selectedDifficulty;
}

export const selectWordToGuess = (state: ApplicationState) =>{
    return state.game.wordToGuess;
}

export const selectGuessedLetters = (state: ApplicationState) =>{
    return state.game.guessedLetters;
}