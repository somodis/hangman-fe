import { AutoSaveGameModel, GameModel, StartGameModel } from '../models';
import request, { Methods } from '../utils/request';

class GameService {
  private resource = 'game';

  // todo: startgame
  async startGame(data: StartGameModel) {
    return request<GameModel>({ resource: `${this.resource}`, data, method: Methods.POST });
  }

  // todo: endgame
  async endGame(data: AutoSaveGameModel) {
    return request<GameModel>({ resource: `${this.resource}`, data, method: Methods.PATCH });
  }

  // todo: autoSaveGame
  async autoSaveGame(data: AutoSaveGameModel) {
    return request<GameModel>({ resource: `${this.resource}/${data.id}`, data, method: Methods.PATCH });
  }
}
export const gameService = new GameService();
