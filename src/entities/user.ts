import { ObjectType, Field, ID } from "type-graphql";
import { Ref, prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Review } from "./review";

@ObjectType()
export class User {
  @Field(() => ID)
  readonly _id!: ObjectId;

  @Field()
  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;

  @Field(() => [Review])
  @prop({ ref: () => Review, localField: "_id", foreignField: "user", required: false })
  reviews?: Ref<Review>[];
}
