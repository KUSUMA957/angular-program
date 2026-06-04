import { EntityState } from '@ngrx/entity';
import { Product } from './product.model';

export interface CartState extends EntityState<Product> {
  // Additional state properties can be added here if needed
}
