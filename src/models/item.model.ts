import { v4 as uuidv4 } from "uuid";
import * as faker from "@faker-js/faker";

// npm i vue3-uuid
// npm install vue-faker
// npm install --save-dev @faker-js/faker
export interface Item {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  createdAt: Date;
  deletedAt?: Date;
}

export function generateFakeData(): Item {
  return {
    id: uuidv4(),
    quantity: Math.random(),
    name: faker.faker.name.firstName.toString(),
    description: faker.faker.address.cityName.toString(),
    createdAt: new Date(),
  };
}
