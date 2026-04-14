import { ContactRepository } from "../repositories/contact.repository";
import { Contact, Prisma } from "@prisma/client";

export class ContactService {
  private contactRepository: ContactRepository;

  constructor() {
    this.contactRepository = new ContactRepository();
  }

  async getAllContacts(): Promise<Contact[]> {
    return this.contactRepository.findAll();
  }

  async getContactById(id: string): Promise<Contact | null> {
    return this.contactRepository.findById(id);
  }

  async createContact(data: any): Promise<Contact> {
    const { user, first_name, last_name, phone, birthday_day, birthday_month, message_source, message_body } = data;

    return this.contactRepository.create({
      user,
      first_name,
      last_name,
      phone,
      birthday_day,
      birthday_month,
      message_source,
      message_body,
      is_active: true,
    });
  }

  async updateContact(id: string, data: any): Promise<Contact> {
    const updateData: Prisma.ContactUpdateInput = { ...data };
    // if (data.birthdate) {
    //   updateData.birthdate = new Date(data.birthdate);
    // }
    return this.contactRepository.update(id, updateData);
  }

  async deleteContact(id: string): Promise<Contact> {
    return this.contactRepository.delete(id);
  }
}
