export class Order {
  [key: string]: any;
  _id: string = 'new';
  customerId: {_id: string} = {_id: ''};
  productId: {_id: string} = {_id: ''};
  amount: number = 0;
  status: string = 'completed' || 'in progress' || 'cancelled';
}
