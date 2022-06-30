import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';
import { OrderService } from 'src/app/service/order.service';
import { CustomerService } from 'src/app/service/customer.service';
import { AddressService } from 'src/app/service/address.service';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  listProduct$ = this.productService.getAll();
  listProductAvaiable$ = this.listProduct$.pipe(
    map((listProduct) => {
      return listProduct.filter((product) => {
        return product['Elérhető'];
      });
    })
  );

  listOrder$ = this.orderService.getAll();
  listOrderCompleted$ = this.listOrder$.pipe(
    map((listOrder) => {
      return listOrder.filter((order) => {
        return order.status === 'completed';
      });
    })
  );
  listOrderInProgress$ = this.listOrder$.pipe(
    map((listOrder) => {
      return listOrder.filter((order) => {
        return order.status === 'in progress';
      });
    })
  );
  listOrderWithdrawn$ = this.listOrder$.pipe(
    map((listOrder) => {
      return listOrder.filter((order) => {
        return order.status === 'withdrawn';
      });
    })
  );

  listCustomer$ = this.customerService.getAll();
  listAddress$ = this.addressService.getAll();

  listBill$ = this.billService.getAll();
  listBillNew$ = this.listBill$.pipe(
    map((listBill) => {
      return listBill.filter((bill) => {
        return bill.status === 'új';
      });
    })
  );
  listBillCompleted$ = this.listBill$.pipe(
    map((listBill) => {
      return listBill.filter((bill) => {
        return bill.status === 'teljesítve';
      });
    })
  );
  listBillStorned$ = this.listBill$.pipe(
    map((listBill) => {
      return listBill.filter((bill) => {
        return bill.status === 'stornózott';
      });
    })
  );

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private addressService: AddressService,
    private billService: BillService
  ) {}

  ngOnInit(): void {}
}
