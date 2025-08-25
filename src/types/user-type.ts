export interface IUser {
  createdAt: string;
  email: string;
  isBlocked: boolean;
  isDeleted: boolean;
  isVerified: boolean;
  name: string;
  phone: string;
  picture: string;
  role: string;
  updatedAt: string;
  sosContacts: IContact[];
}
export interface IContact {
  _id: string;
  name: string;
  phone: string;
  isPrimary: boolean;
}

export type TUserRole = "ADMIN" | "RIDER" | "DRIVER";
