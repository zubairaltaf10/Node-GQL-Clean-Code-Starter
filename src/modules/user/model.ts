import { getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

import { User } from "../../entities";
import { Service } from "typedi";
import { CreateUserInput } from "./inputs/create-user-input";

export const UserMongooseModel = getModelForClass(User);

@Service()
export default class UserModel {
  async getById(_id: ObjectId, ...relations: string[]): Promise<User | null> {
    let query = UserMongooseModel.findById(_id);
    if (relations.length) {
      query = query.populate(relations.join(" "));
    }
    return query.lean();
  }

  async create(data: CreateUserInput): Promise<User> {
    const user = new UserMongooseModel(data);
    return user.save();
  }
}
