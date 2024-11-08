import { OrderType } from './OrderType';
import { ProductType } from './ProductTypes';

export interface OrderProductType {
  id: number;
  orderId: number;
  productId: number;
  amount: number;
  price: number;
  order?: OrderType;
  product?: ProductType;
}
