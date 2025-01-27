import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Roles, RolesDocument } from './roles.schema';
import { Model } from 'mongoose';
import { RoleInterface } from './interfaces/roles.interface';

@Injectable()
export class RolesService {

  constructor(
    @InjectModel(Roles.name) private rolesModel: Model<RolesDocument>
  ) {}

  async getRoles(id: string | undefined) {
    return id
      ? await this.rolesModel.findById(id)
      : await this.rolesModel.find()
  }

  async createRole(role: RoleInterface) {
    const roleDoc = new this.rolesModel(role)
    return await roleDoc.save()
  }
}
