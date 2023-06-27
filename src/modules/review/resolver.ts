import { Resolver, Arg, Query, Mutation, ID, Root, FieldResolver, UseMiddleware } from "type-graphql";
import { Service } from "typedi";
import { ObjectId } from "mongodb";

import { Game, Review } from "../../entities";
import ReviewService from "./service";
import GameService from "../game/service";
import { DocumentType } from "@typegoose/typegoose";
import { CreateReviewInput } from "./inputs/create-review-input";

@Service()
@Resolver(() => Review)
export default class ReviewResolver {
  constructor(private readonly reviewService: ReviewService, private readonly gameService: GameService) {}

  @Query(() => Review)
  async getReview(@Arg("id") id: ObjectId) {
    const review = await this.reviewService.getById(id);
    return review;
  }

  @FieldResolver(() => Game)
  async game(@Root() review: DocumentType<Review>): Promise<Game | null> {
    const gameId = new ObjectId(review?.game?._id.toString());
    const game = await this.gameService.getById(gameId);
    return game || null;
  }

  @Mutation(() => Review)
  async createReview(
    @Arg("createReviewInput") createReviewInput: CreateReviewInput
  ): Promise<Review> {
    const review = await this.reviewService.addReview(createReviewInput);
    return review;
  }
}
