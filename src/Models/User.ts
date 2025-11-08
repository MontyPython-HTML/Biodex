import { Pet } from '@/src/Models/Pet'
import { Plant } from '@/src/Models/Plant'

export interface User {
  id: string;
  username: string;
  level: number;
  pet: Pet;
  plants: Plant[];
}
