export interface WordModel {
  id: number;
  word: string;
  wordLength: number;
}

export interface addWordResponse {
  errors: string | null;
  word: WordModel;
}
