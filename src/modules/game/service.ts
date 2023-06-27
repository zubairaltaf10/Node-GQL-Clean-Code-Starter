import { Service } from "typedi";
import { ObjectId } from "mongodb";

import GameModel from "./model";
import { Game } from "../../entities";
import { CreateGameInput } from "./inputs/create-game-input";

@Service()
export default class GameService {
  constructor(private readonly gameModel: GameModel) {}

  public async getById(_id: ObjectId): Promise<Game | null> {
    return this.gameModel.getById(_id);
  }

  public async addGame(data: CreateGameInput): Promise<Game> {
    const newGame = await this.gameModel.create(data);
    return newGame;
  }
}
