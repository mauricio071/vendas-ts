import { CategoryType } from './CategoryType';

export interface ProductType {
  key: number;
  id: number;
  name: string;
  image: string;
  price: number;
  weight: number;
  length: number;
  height: number;
  width: number;
  diameter: number;
  category: CategoryType;
}
