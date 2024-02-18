export const checkIfLost = (mistakeCount: number): boolean => mistakeCount >= 6;
export const checkIfWon = (word: string, guessedLetters: string[]): boolean => word.split('').every((letter) => guessedLetters.includes(letter));
