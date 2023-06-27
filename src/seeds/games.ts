import { GameMongooseModel } from "../modules/game/model";

export const seedGames = async () => {
  try {
    const existingGames = await GameMongooseModel.find();
    if (existingGames.length > 0) {
      console.log("Games already exists. Skipping game seeding.");
      return;
    }
    
    const gamesData = [
      { title: "FIFA 2023", description: "Experience the thrill" },
      { title: "Call of Duty: MW2", description: "Explore new maps" },
    ];

    for (const gameData of gamesData) {
      const newGame = new GameMongooseModel(gameData);
      await newGame.save();
      console.log(`Created game: ${newGame.title}`);
    }

    console.log("Game seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding games:", error);
  }
}
