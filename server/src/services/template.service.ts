import { TemplateRepository } from "../repositories/template.repository";
import { ContactRepository } from "../repositories/contact.repository";
import { Template } from "@prisma/client";

export class TemplateService {
  private templateRepository: TemplateRepository;
  private contactRepository: ContactRepository;

  constructor() {
    this.templateRepository = new TemplateRepository();
    this.contactRepository = new ContactRepository();
  }

  async createTemplate(contact_id: string, message: string, scheduled_time: string): Promise<Template> {
    const contact = await this.contactRepository.findById(contact_id);
    if (!contact) {
      throw new Error("Contact not found");
    }

    return this.templateRepository.create({
      user_id: contact.user_id,
      body: message,
      name: `Template for ${contact.first_name} ${contact.last_name}`,
      channel: "SMS",
    });
  }

  async getTemplatesByContact(contact_id: string): Promise<Template[]> {
    return this.templateRepository.findByContactId(contact_id);
  }
}
