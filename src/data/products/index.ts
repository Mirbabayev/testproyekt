import { Product } from './types';
import { menProducts } from './men';
import { womenProducts } from './women';
import { unisexProducts } from './uniseks';

export const products: Product[] = [
  ...menProducts,
  ...womenProducts,
  ...unisexProducts
];

export { menProducts, womenProducts, unisexProducts }; 