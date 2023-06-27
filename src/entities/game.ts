import { ObjectType, Field, ID } from "type-graphql";
import { prop, Ref } from "@typegoose/typegoose";;
import { ObjectId } from "mongoose";
import { Review } from "./review";

@ObjectType()
export class Game {
  @Field(() => ID)
  readonly _id!: ObjectId;

  @Field()
  @prop({ required: true })
  title: string;

  @Field()
  @prop({ required: true })
  description: string;

  @Field(() => [Review])
  @prop({ ref: () => Review, localField: "_id", foreignField: "game", required: false })
  reviews?: Ref<Review>[];
}
