import { AutoSaveGameModel, GameModel, ResponseGameModel, StartGameModel } from '../models';
import request, { Methods } from '../utils/request';

class GameService {
  private resource = 'game';

  async getGame(userId: number) {
    return request<ResponseGameModel>({ resource: `${this.resource}/user/${userId}`, method: Methods.GET });
  }

  async startGame(data: StartGameModel) {
    return request<GameModel>({ resource: `${this.resource}`, data, method: Methods.POST });
  }

  async endGame(data: AutoSaveGameModel) {
    return request<GameModel>({ resource: `${this.resource}`, data, method: Methods.PATCH });
  }

  async autoSaveGame(data: AutoSaveGameModel) {
    return request<GameModel>({ resource: `${this.resource}/${data.id}`, data, method: Methods.PATCH });
  }
}
export const gameService = new GameService();
