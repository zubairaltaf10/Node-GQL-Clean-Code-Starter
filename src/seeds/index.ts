import mongoose from "../bootstrap/loaders/mongoose";
import { seedGames } from "./games";
import { seedReviews } from "./reviews";
import { seedUsers } from "./users";

const seed = async () => {
  try {
    await mongoose();
    await seedUsers();
    await seedGames();
    await seedReviews();
    console.log("Data seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seed();
