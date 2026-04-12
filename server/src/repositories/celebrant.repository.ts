import { Prisma, Celebrant } from "@prisma/client";
import prisma from "../configs/prisma";

export class CelebrantRepository {
  async findByUsername(username: string): Promise<Celebrant | null> {
    return prisma.celebrant.findUnique({
      where: { username },
    });
  }

  async create(data: Prisma.CelebrantCreateInput): Promise<Celebrant> {
    return prisma.celebrant.create({
      data,
    });
  }

  async findAll(): Promise<Celebrant[]> {
    return prisma.celebrant.findMany();
  }

  async findById(id: number): Promise<Celebrant | null> {
    return prisma.celebrant.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.CelebrantUpdateInput): Promise<Celebrant> {
    return prisma.celebrant.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Celebrant> {
    return prisma.celebrant.delete({
      where: { id },
    });
  }

  async countByUsername(username: string): Promise<number> {
    return prisma.celebrant.count({
      where: { username },
    });
  }
}
