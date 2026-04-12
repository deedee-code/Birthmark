import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { UserRepository } from "../repositories/user.repository";
import { User, Prisma } from "@prisma/client";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds: number = parseInt(process.env.SALTROUNDSHASH || "10");
    return await bcrypt.hash(password, saltRounds);
  }

  async generateApiKey(phone_number: string): Promise<string> {
    const hashedPhoneNumber = await bcrypt.hash(phone_number, 10);
    const uuid = uuidv4();
    const combinedString = `${uuid}${hashedPhoneNumber}`;
    return await bcrypt.hash(combinedString, 10);
  }

  async validateUser(phone_number: string, password: string): Promise<User | { message: string } | null> {
    const user = await this.userRepository.findByPhoneNumber(phone_number);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return user;
      }
      return { message: "Invalid Credentials" };
    }
    return null;
  }

  async registerUser(phone_number: string, password: string): Promise<User> {
    const hashedPassword = await this.hashPassword(password);
    const api_key = await this.generateApiKey(phone_number);

    return this.userRepository.create({
      phone_number,
      password: hashedPassword,
      api_key,
      is_admin: true,
    });
  }
}
