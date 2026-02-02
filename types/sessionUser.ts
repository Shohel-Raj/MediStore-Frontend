import { UserRole } from "./role.type";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: UserRole
  status: "ACTIVE" | "INACTIVE";
  createdAt: Date;
  updatedAt: Date;
  phone?: string | null;
};

export type UserInfo = {
  name: string;
  email: string;
  image: string | null;
  role: UserRole;
};