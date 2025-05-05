import { I_User } from "../../interfaces/user.interfaces";
import { generateHash } from "../../utils/hash.util";
import UserRepository from "../repositories/user.repository";

class UserService {
  private userRepository = new UserRepository();

  async hashPassword(user: I_User): Promise<I_User> {
    user.password = await generateHash(user.password);

    return user;
  }
  async validateNewUser(user: I_User): Promise<void> {
    let existingUsers: I_User[] | I_User;

    if (!user.name) {
      throw new Error("Name is required");
    }

    if (!user.password) {
      throw new Error("Password is required");
    }

    if (!user.phone) {
      throw new Error("Phone is required");
    }

    if (!user.role) {
      throw new Error("Role is required");
    }

    if (!user.email) {
      throw new Error("Email is required");
    }

    if (!user.rg) {
      throw new Error("RG is required");
    }

    if (!user.cpf) {
      throw new Error("CPF is required");
    }

    if (user.role === "medico") {
      if (!user.crm) {
        throw new Error("CRM is required for medico role");
      }
    }

    if (user.address) {
      if (!user.address.street) {
        throw new Error("Street is required in address");
      }

      if (!user.address.number) {
        throw new Error("Number is required in address");
      }

      if (!user.address.neighborhood) {
        throw new Error("Neighborhood is required in address");
      }

      if (!user.address.city) {
        throw new Error("City is required in address");
      }

      if (!user.address.state) {
        throw new Error("State is required in address");
      }

      if (!user.address.cep) {
        throw new Error("CEP is required in address");
      }
    }

    existingUsers = await this.userRepository.findByEmail(user.email);

    if (existingUsers) {
      throw new Error("User already exists with this email");
    }

    if (user.role === "medico") {
      existingUsers = await this.userRepository.findByCrm(user.crm);

      if (existingUsers) {
        throw new Error("User already exists with this CRM");
      }
    }
  }
}

export default UserService;
