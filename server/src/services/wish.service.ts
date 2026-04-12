import { WishRepository } from "../repositories/wish.repository";
import { CelebrantRepository } from "../repositories/celebrant.repository";
import { BirthdayWish } from "@prisma/client";

export class WishService {
  private wishRepository: WishRepository;
  private celebrantRepository: CelebrantRepository;

  constructor() {
    this.wishRepository = new WishRepository();
    this.celebrantRepository = new CelebrantRepository();
  }

  async createWish(celebrant_id: number, message: string, scheduled_time: string): Promise<BirthdayWish> {
    const celebrant = await this.celebrantRepository.findById(celebrant_id);
    if (!celebrant) {
      throw new Error("Celebrant not found");
    }

    return this.wishRepository.create({
      celebrant_id,
      message,
      scheduled_time: new Date(scheduled_time),
    });
  }

  async getWishesByCelebrant(celebrant_id: number): Promise<BirthdayWish[]> {
    return this.wishRepository.findByCelebrantId(celebrant_id);
  }
}
