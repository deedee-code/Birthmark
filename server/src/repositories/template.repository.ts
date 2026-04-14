import { Prisma, Template } from "@prisma/client";
import prisma from "../configs/prisma";

export class TemplateRepository {
  async create(data: Prisma.TemplateUncheckedCreateInput): Promise<Template> {
    return prisma.template.create({
      data,
    });
  }

  async findByContactId(user_id: string): Promise<Template[]> {
    return prisma.template.findMany({
      where: { user_id },
    });
  }

  async findById(id: string): Promise<Template | null> {
    return prisma.template.findUnique({
      where: { id },
      include: {
        contacts: true,
      },
    });
  }
}
