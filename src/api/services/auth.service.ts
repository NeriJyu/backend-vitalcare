import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { I_Auth } from "../../interfaces/auth.interfaces";

class AuthService {
  constructor() {}

  async signIn(email: string, password: string): Promise<I_Auth> {
    const mockUser = {
      id: "1",
      email: "admin@example.com",
      password: "$2b$10$XdGpDKK2cbGA7o0zE91RW.ICLWEEF0vUI2ESgVXLOP.T0q4Gy2kHC", //password123
    };

    if (email !== mockUser.email) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, mockUser.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: mockUser.id, email: mockUser.email },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );

    return token;
  }
}

export default AuthService;
