import { Injectable } from '@angular/core';
import { INgxTableColumn } from '../data-table/ngx-data-table/ngx-data-table.component';

export interface IMenuItem {
  link: string;
  title: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  sidebarMenu: IMenuItem[] = [
    {link: '/', title: 'Dashboard', icon: 'home'},
    {link: '/termekek', title: 'Termékek', icon: 'archive'},
    {link: '/vasarlok', title: 'Vásárlók', icon: 'user'},
    {link: '/cimek', title: 'Címek', icon: 'paperclip'},
    {link: '/rendelesek', title: 'Rendelések', icon: 'shopping-cart'},
    {link: '/szamlak', title: 'Számlák', icon: 'book-open'},
  ];

  productTableColumns: INgxTableColumn[] = [
    {key: '_id', title: '#'},
    {key: 'Elérhető', title: 'Elérhető'},
    {key: 'Kiszerelés', title: 'Kiszerelés'},
    {key: 'Ár', title: 'Ár'},
    {key: 'Magyar név', title: 'Magyar név'},
    {key: 'Latin név', title: 'Latin név'},
    {key: 'Teljes magasság', title: 'Teljes magasság'},
    {key: 'Talajigény', title: 'Talajigény'},
    {key: 'Fényigény', title: 'Fényigény'},
    {key: 'Tenyészidő', title: 'Tenyészidő'},
    {key: 'Habitus', title: 'Habitus'},
    {key: 'Virág színe', title: 'Virág színe'},
    {key: 'Virágzás ideje', title: 'Virágzás ideje'},
    {key: 'Egyéb', title: 'Egyéb'},

  ];

  customerTableColumns: INgxTableColumn[] = [
    {key: '_id', title: '#'},
    {key: 'firstName', title: 'Vezetéknév'},
    {key: 'lastName', title: 'Keresztnév'},
    {key: 'addressBillId', title: 'Számlázási cím'},
    {key: 'addressShipId', title: 'Szállítási cím'},
    {key: 'email', title: 'Email'},
    {key: 'phone', title: 'Telefon'},
  ];

  addressTableColumns: INgxTableColumn[] = [
    {key: '_id', title: '#'},
    {key: 'zip', title: 'Irányítószám'},
    {key: 'city', title: 'Város'},
    {key: 'street', title: 'Utca'}
  ];

  orderTableColumns: INgxTableColumn[] = [
    {key: '_id', title: '#'},
    {key: 'customerId', title: 'Vásárló'},
    {key: 'productId', title: 'Termék'},
    {key: 'amount', title: 'Mennyiség'},
    {key: 'status', title: 'Státusz'},
  ];

  billTableColumns: INgxTableColumn[] = [
    {key: '_id', title: '#'},
    {key: 'orderId', title: 'Rendelés'},
    {key: 'price', title: 'Ár'},
    {key: 'status', title: 'Státusz'},
  ];

  constructor() { }
}
