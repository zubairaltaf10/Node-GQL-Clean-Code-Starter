import { Resolver, Arg, Query, Mutation, ID } from "type-graphql";
import { Service } from "typedi";
import { ObjectId } from "mongodb";

import { Game } from "../../entities";
import GameService from "./service";
import { CreateGameInput } from "./inputs/create-game-input";

@Service()
@Resolver(() => Game)
export default class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Query(() => Game)
  async getGame(@Arg("id") id: ObjectId) {
    const game = await this.gameService.getById(id);
    return game;
  }

  @Mutation(() => Game)
  async createGame(
    @Arg("createGameInput") createGameInput: CreateGameInput
  ): Promise<Game> {
    const game = await this.gameService.addGame(createGameInput);
    return game;
  }
}
