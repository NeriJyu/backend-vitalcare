import User from "../models/user.model";
import { I_User } from "../../interfaces/user.interfaces";

export default class UserRepository {
  async create(user: I_User): Promise<I_User> {
    const newUser = new User(user);
    return await newUser.save();
  }

  async findById(userId: string): Promise<I_User | null> {
    return await User.findById(userId).exec();
  }

  async findByEmail(email: string): Promise<I_User | null> {
    return await User.findOne({ email }).exec();
  }

  async findByCrm(crm: string): Promise<I_User | null> {
    return await User.findOne({ crm }).exec();
  }

  async findAll(): Promise<I_User[]> {
    return await User.find().exec();
  }

  async updateById(
    userId: string,
    updateData: Partial<I_User>
  ): Promise<I_User | null> {
    return await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).exec();
  }

  async deleteById(userId: string): Promise<I_User | null> {
    return await User.findByIdAndDelete(userId).exec();
  }
}
