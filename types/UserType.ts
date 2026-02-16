import { UserRole } from "./role.type";

export type UserType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  role: UserRole;
  status: string;
  phone?: string | null;
};