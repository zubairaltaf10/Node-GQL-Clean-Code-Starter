import { getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

import { Review } from "../../entities";
import { Service } from "typedi";

export const ReviewMongooseModel = getModelForClass(Review);
@Service()
export default class ReviewModel {

  async getById(_id: ObjectId, ...relations: string[]): Promise<Review | null> {
    let query = ReviewMongooseModel.findById(_id);
    if (relations.length) {
      query = query.populate(relations.join(" "));
    }
    return query.lean();
  }

  async create(data: Review): Promise<Review> {
    const review = new ReviewMongooseModel(data);

    return review.save();
  }
}
