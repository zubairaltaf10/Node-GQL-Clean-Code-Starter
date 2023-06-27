import { ObjectType, Field, ID } from "type-graphql";
import { prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./user";

@ObjectType()
export class RequestLog {
  @Field(() => ID)
  readonly _id!: ObjectId;

  @Field()
  @prop({ required: true })
  ipAddress!: string;

  @Field(() => ID)
  @prop({ ref: 'User', required: true })
  userId!: Ref<User>;

  @Field()
  @prop({ required: true, default: Date.now })
  timestamp!: Date;
}
