import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { I_Auth } from "../../interfaces/auth.interfaces";
import UserRepository from "../repositories/user.repository";

class AuthService {
  private userRepository = new UserRepository();

  constructor() {}

  async signIn(email: string, password: string): Promise<I_Auth> {
    this.validateLogin(email, password);

    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user) {
      throw new Error("User not found");
    }

    if (email !== user.email) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const userWithoutPassword = {
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(
      { ...userWithoutPassword },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "72h",
      }
    );

    return token;
  }

  validateLogin(email: string, password: string): void {
    if (!email) {
      throw new Error("Email is required");
    }

    if (!password) {
      throw new Error("Password is required");
    }
  }
}

export default AuthService;
