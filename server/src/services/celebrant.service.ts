import { CelebrantRepository } from "../repositories/celebrant.repository";
import { Celebrant, Prisma } from "@prisma/client";

export class CelebrantService {
  private celebrantRepository: CelebrantRepository;

  constructor() {
    this.celebrantRepository = new CelebrantRepository();
  }

  async getAllCelebrants(): Promise<Celebrant[]> {
    return this.celebrantRepository.findAll();
  }

  async getCelebrantById(id: number): Promise<Celebrant | null> {
    return this.celebrantRepository.findById(id);
  }

  async createCelebrant(data: any): Promise<Celebrant> {
    const { username, gender, email, phone_number, birthdate, channel } = data;
    
    const exists = await this.celebrantRepository.countByUsername(username);
    if (exists > 0) {
      throw new Error("Username already exists");
    }

    return this.celebrantRepository.create({
      username,
      gender,
      email,
      phone_number,
      birthdate: new Date(birthdate),
      channel,
      is_active: true,
    });
  }

  async updateCelebrant(id: number, data: any): Promise<Celebrant> {
    const updateData: Prisma.CelebrantUpdateInput = { ...data };
    if (data.birthdate) {
      updateData.birthdate = new Date(data.birthdate);
    }
    return this.celebrantRepository.update(id, updateData);
  }

  async deleteCelebrant(id: number): Promise<Celebrant> {
    return this.celebrantRepository.delete(id);
  }
}
