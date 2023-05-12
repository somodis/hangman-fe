
export const checkIfLost = (mistakeCount: number): boolean =>{
    return mistakeCount >= 6;
}
export const checkIfWon = (word: string, guessedLetters: string[]): boolean =>{
    return word.split('').every((letter) => guessedLetters.includes(letter));
}