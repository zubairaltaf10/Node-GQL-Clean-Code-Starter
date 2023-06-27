import { getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

import { Game } from "../../entities";
import { Service } from "typedi";
import { CreateGameInput } from "./inputs/create-game-input";

export const GameMongooseModel = getModelForClass(Game);

@Service() 
export default class GameModel {
  async getById(_id: ObjectId): Promise<Game | null> {
    return GameMongooseModel.findById(_id).lean();
  }

  async create(data: CreateGameInput): Promise<Game> {
    const game = new GameMongooseModel(data);
    return game.save();
  }
}
