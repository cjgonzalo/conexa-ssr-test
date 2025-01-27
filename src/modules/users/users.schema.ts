import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument, Types } from "mongoose"
import { UserInterface } from "./interfaces/user.interface"
import { hashPassword, validateEmail, validatePassword } from "./middlewares/user.middleware"

@Schema()
export class User implements UserInterface {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  lastName: string

  @Prop({ required: true, unique: true, validate: validateEmail })
  email: string

  @Prop({ required: true, validate: validatePassword, pre: hashPassword })
  password: string
  
  @Prop({ type: Types.ObjectId, required: true, ref: "Roles" })
  role: Types.ObjectId
}

export type UserDocument = HydratedDocument<User>
const UserSchema = SchemaFactory.createForClass(User)

// UserSchema.pre("save", hashPassword)

export default UserSchema