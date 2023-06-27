import { Service } from "typedi";
import { ObjectId } from "mongodb";
import { User } from "../../entities";
import { CreateUserInput } from "./inputs/create-user-input";
import UserModel from "./model";
import { hashPassword, signToken } from "../../utils/auth";

@Service()
export default class UserService {
  constructor(private readonly userModel: UserModel) {}

  public async getById(_id: ObjectId): Promise<User | null> {
    return this.userModel.getById(_id);
  }

  public async addUser(data: CreateUserInput): Promise<string> {
    const { password, ...rest } = data;
    const hashedPassword = await hashPassword(password);
    const user = await this.userModel.create({
      ...rest,
      password: hashedPassword,
    });
    return signToken({ userId: user._id.toString(), password: user.password })
  }
}
