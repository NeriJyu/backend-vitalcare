import { I_User } from "../../interfaces/user.interfaces";
import UserRepository from "../repositories/user.repository";
import UserService from "../services/user.service";

export default class UserController {
  private userRepository = new UserRepository();
  private userService = new UserService();

  async create(user: I_User): Promise<I_User> {
    await this.userService.validateNewUser(user);

    const hashedUser = await this.userService.hashPassword(user);
    const createdUser = await this.userRepository.create(hashedUser);

    return createdUser;
  }

  async getById(userId: string): Promise<I_User> {
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async getByEmail(email: string): Promise<I_User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async getAll(): Promise<I_User[]> {
    const users = await this.userRepository.findAll();

    return users;
  }

  async update(userId: string, userData: I_User): Promise<I_User> {
    const updatedUser = await this.userRepository.updateById(userId, userData);

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  }

  async delete(userId: string): Promise<{ message: string }> {
    const deletedUser = await this.userRepository.deleteById(userId);

    if (!deletedUser) {
      throw new Error("User not found");
    }

    return { message: "User deleted successfully" };
  }
}
