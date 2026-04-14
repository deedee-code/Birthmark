import { Prisma, Contact } from "@prisma/client";
import prisma from "../configs/prisma";

export class ContactRepository {
  async create(data: Prisma.ContactCreateInput): Promise<Contact> {
    return prisma.contact.create({
      data,
    });
  }

  async findAll(): Promise<Contact[]> {
    return prisma.contact.findMany();
  }

  async findById(id: string): Promise<Contact | null> {
    return prisma.contact.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.ContactUpdateInput): Promise<Contact> {
    return prisma.contact.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Contact> {
    return prisma.contact.delete({
      where: { id },
    });
  }
}
