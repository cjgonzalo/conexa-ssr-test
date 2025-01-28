import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Roles, RolesDocument } from './roles.schema';
import { Model } from 'mongoose';
import { RoleInterface } from './interfaces/roles.interface';
import { ROLES } from './enums/roles.enum';

@Injectable()
export class RolesService implements OnModuleInit {

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

  async onModuleInit() {
    const admin = await this.rolesModel.findOne({ name: ROLES.ADMIN })
    if(!admin) {
      const adminRole = new this.rolesModel({ name: ROLES.ADMIN })
      await adminRole.save()
    }
  }
}
