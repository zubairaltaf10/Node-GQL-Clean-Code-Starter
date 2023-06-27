import { GameMongooseModel } from "../modules/game/model";
import { ReviewMongooseModel } from "../modules/review/model";
import { UserMongooseModel } from "../modules/user/model";

export const seedReviews = async () => {
  try {
    const existingReviews = await ReviewMongooseModel.find();
    if (existingReviews.length > 0) {
      console.log("Reviews already exists. Skipping review seeding.");
      return;
    }
    const existingUsers = await UserMongooseModel.find();
    const existingGames = await GameMongooseModel.find();

    const reviewsData = [{
        content: "Great game!",
        rating: 4,
        user: existingUsers[0]._id,
        game: existingGames[0]._id,
      },
      {
        content: "Awesome graphics!",
        rating: 5,
        user: existingUsers[1]._id,
        game: existingGames[1]._id,
      }]

    for (const reviewData of reviewsData) {
      const newReview = new ReviewMongooseModel(reviewData);
      await newReview.save();
      console.log(`Created review: ${newReview.content}`);
    }

    console.log("Review seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding reviews:", error);
  }
}
