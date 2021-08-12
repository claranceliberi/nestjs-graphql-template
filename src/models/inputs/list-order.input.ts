import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum ListOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  published = 'published',
  title = 'title',
}

registerEnumType(ListOrderField, {
  name: 'ListOrderField',
  description: 'Properties by which list connections can be ordered.',
});

@InputType()
export class ListOrder extends Order {
  field: ListOrderField;
}
