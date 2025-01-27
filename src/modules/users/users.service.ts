import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { UserInterface } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async getUserById(id: string): Promise<UserInterface | null> {
    return await this
      .userModel
      .findById(id)
      .populate("role")
  }

  async getUserByEmail(email: string): Promise<UserInterface> {
    const user = await this
      .userModel
      .findOne({ email })
      .populate("role")
    
    if(!user) {
      throw new Error("User not found")
    }

    return user
  }

  async createUser(user: UserInterface): Promise<UserInterface> {
    const userDoc = new this.userModel(user)
    return await userDoc.save()
  }
}
