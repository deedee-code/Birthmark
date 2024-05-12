export interface BirthdayWish {
  id: number;
  celebrant_id: number;
  message: string;
  username: string;
}

export interface Wish {
  id: number;
  celebrant_id: number;
  message: string;
}

export interface CelebrantDetails {
  id: number;
  username: string;
  email: string;
  phone_number: string;
}
