import { Field, InputType} from "type-graphql";
import { MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateGameInput {
  @Field()
  @MaxLength(300)
  @MinLength(3)
  title: string;

  @Field()
  @MinLength(1)
  description: string;
}
