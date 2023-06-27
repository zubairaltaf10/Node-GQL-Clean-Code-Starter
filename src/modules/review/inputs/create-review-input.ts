import { Field, InputType, Int } from "type-graphql";
import { MaxLength, MinLength } from "class-validator";
import { ObjectId } from "bson";

@InputType()
export class CreateReviewInput {
  @Field()
  @MaxLength(300)
  @MinLength(1)
  content: string;

  @Field(() => Int)
  rating: number;

  @Field(() => ObjectId)
  gameId: ObjectId;
}
