import { Pet } from '@/src/Models/Pet'

export interface User {
  id: string;
  username: string;
  level: number;
  pet: Pet;
}
