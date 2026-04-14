import bcrypt from "bcryptjs";
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

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(password, user.password_hash);
    return match ? user : null;
  }

  async registerUser(email: string, password: string, full_name: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await this.hashPassword(password);

    return this.userRepository.create({
      email,
      password_hash: hashedPassword,
      full_name,
      timezone: process.env.DEFAULT_TIMEZONE || "UTC",
    });
  }
}
