import { ObjectType, Field, ID, Int } from "type-graphql";
import { prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Game } from "./game";

@ObjectType()
export class Review {
  @Field(() => ID)
  readonly _id!: ObjectId;

  @Field()
  @prop({ required: true })
  content: string;

  @Field(() => Int)
  @prop({ required: true })
  rating: number;

  @Field(() => Game, {nullable: true})
  @prop({ ref: () => Game, required: false })
  game?: Ref<Game>;
}
