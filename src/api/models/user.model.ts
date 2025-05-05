import mongoose, { Schema, Types } from "mongoose";
import { I_User, I_UserAddress } from "../../interfaces/user.interfaces";
import { UserRoleEnum } from "../enums/user.enum";

const UserAddressSchema = new Schema<I_UserAddress>({
  street: { type: String, required: true },
  number: { type: String, required: true },
  complement: { type: String },
  neighborhood: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  cep: { type: String, required: true },
});

const UserSchema = new Schema<I_User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRoleEnum), required: true },
    phone: { type: String, required: true },
    cpf: { type: String, required: true },
    rg: { type: String, required: true },
    crm: { type: String },
    address: { type: UserAddressSchema },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
    },
    toObject: {
      versionKey: false,
    },
  }
);

export default mongoose.model<I_User>("User", UserSchema);
