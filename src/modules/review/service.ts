import { Service } from "typedi";
import { ObjectId } from "mongodb";
import { DocumentType } from '@typegoose/typegoose';

import ReviewModel from "./model";
import { Game, Review } from "../../entities";
import GameModel from "../game/model";
import { CreateReviewInput } from "./inputs/create-review-input";

@Service()
export default class ReviewService {
  constructor(
    private readonly reviewModel: ReviewModel,
    private readonly gameModel: GameModel
  ) {}

  public async getById(_id: ObjectId, ...relations: string[]): Promise<Review | null> {
    const model = await this.reviewModel.getById(_id, ...relations);
    return model;
  }

  public async addReview(data: CreateReviewInput): Promise<Review> {
    const { gameId, ...rest } = data;

    const game = await this.gameModel.getById(gameId);

    if (!game) {
      throw new Error("Game not found");
    }

    const review = new Review();
    review.game = game as DocumentType<Game>;

    const newReview = await this.reviewModel.create({ ...review, ...rest });
    if (game.reviews) {
      game.reviews.push(newReview as DocumentType<Review>);
    } else {
      game.reviews = [newReview as DocumentType<Review>]
    }
    return newReview;
  }
}
