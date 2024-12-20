import { DifficultyLevel, WordModel, addWordResponse } from '../models';
import request, { Methods } from '../utils/request';

class WordService {
  private resource = 'words';

  async getAllWords() {
    return request<WordModel[]>({ resource: `${this.resource}`, method: Methods.GET });
  }

  async getRandomWord(level: DifficultyLevel) {
    return request<WordModel>({ resource: `${this.resource}/random/${level}`, method: Methods.GET });
  }

  async addWord(data: { word: string }) {
    return request<addWordResponse>({ resource: `${this.resource}`, data, method: Methods.POST });
  }
}
export const wordService = new WordService();
