import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument, Types } from "mongoose"

@Schema()
export class Roles {
  @Prop({ required: true })
  name: string  
}

export type RolesDocument = HydratedDocument<Roles>
export const RolesSchema = SchemaFactory.createForClass(Roles)