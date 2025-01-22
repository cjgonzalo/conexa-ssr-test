import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument, Types } from "mongoose"

@Schema()
export class User {
  @Prop({ required: true })
  name: String

  @Prop({ required: true })
  lastname: String
  
  @Prop({ required: true, ref: "Role" })
  role: Types.ObjectId
  
}

export type UserDocument = HydratedDocument<User>
export const UserSchema = SchemaFactory.createForClass(User)