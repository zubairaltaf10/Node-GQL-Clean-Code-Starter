import { UserMongooseModel } from "../modules/user/model";

export const seedUsers = async () => {
  try {
    const existingUsers = await UserMongooseModel.find();
    if (existingUsers.length > 0) {
      console.log("Users already exist. Skipping user seeding.");
      return;
    }

    const usersData = [
      { email: "user1@example.com", password: "password1" },
      { email: "user2@example.com", password: "password2" },
    ];

    for (const userData of usersData) {
      const newUser = new UserMongooseModel(userData);
      await newUser.save();
      console.log(`Created user: ${newUser.email}`);
    }

    console.log("Users seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}
