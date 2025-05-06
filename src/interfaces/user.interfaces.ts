import { Types } from "mongoose";
import { UserRoleEnum } from "../api/enums/user.enum";

export interface I_UserAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
}

export interface I_User {
  id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  phone: string;
  cpf: string;
  rg: string;
  crm?: string;
  address?: I_UserAddress;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface I_UserJwtPayload {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: UserRoleEnum;
}
