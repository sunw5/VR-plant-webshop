import { Address } from './address';
export class Customer {
  [key: string]: any;
  _id: string = 'new';
  firstName: string = '';
  lastName: string = '';
  addressBillId: Address = new Address();
  addressShipId: Address = new Address();
  addressBill: string = '';
  addressShip: string = '';
  email: string = '';
  phone: string = '';
}
