import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument, Types } from "mongoose"

@Schema()
export class Roles {
  @Prop({ required: true })
  role: String  
}

export type RolesDocument = HydratedDocument<Roles>
export const RolesSchema = SchemaFactory.createForClass(Roles)