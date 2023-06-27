import { Resolver, Arg, Query, Mutation, ID, Root, FieldResolver } from "type-graphql";
import { Service } from "typedi";
import { User } from "../../entities";
import { CreateUserInput } from "./inputs/create-user-input";
import UserService from "./service";

@Service()
@Resolver((of) => User)
export default class UserResolver {
  constructor(private readonly userService: UserService) {}

@Mutation((returns) => String)
  async createUser(
    @Arg("createUserInput") createUserInput: CreateUserInput
  ): Promise<string> {
    const jwtToken = await this.userService.addUser(createUserInput);
    return jwtToken;
  }
}