import { Prisma, User } from "@prisma/client";
import prisma from "../configs/prisma";

export class UserRepository {
  async findByPhoneNumber(phone_number: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { phone_number },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}
