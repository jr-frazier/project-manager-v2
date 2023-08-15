import Prisma from "@prisma/client";

export interface User
  extends Omit<Prisma.User, "createdAt" | "updatedAt" | "id"> {}
