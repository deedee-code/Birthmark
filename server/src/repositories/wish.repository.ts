import { Prisma, BirthdayWish } from "@prisma/client";
import prisma from "../configs/prisma";

export class WishRepository {
  async create(data: Prisma.BirthdayWishUncheckedCreateInput): Promise<BirthdayWish> {
    return prisma.birthdayWish.create({
      data,
    });
  }

  async findByCelebrantId(celebrant_id: number): Promise<BirthdayWish[]> {
    return prisma.birthdayWish.findMany({
      where: { celebrant_id },
      include: {
        logs: true,
      },
    });
  }

  async findById(id: number): Promise<BirthdayWish | null> {
    return prisma.birthdayWish.findUnique({
      where: { id },
      include: {
        celebrant: true,
      },
    });
  }
}
