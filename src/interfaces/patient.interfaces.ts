import { Types } from "mongoose";

export interface I_Patient {
  _id?: Types.ObjectId;
  name: string;
  birthDate: Date;
  responsibleRg: string;
  createdAt?: Date;
  updatedAt?: Date;
}
