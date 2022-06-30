import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { Address } from 'src/app/model/address';
import { AddressService } from 'src/app/service/address.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
})
export class CustomerEditComponent implements OnInit {
  customer$!: Observable<Customer>;

  constructor(
    private customerService: CustomerService,
    private addressService: AddressService,
    private aRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customer$ = this.aRoute.params.pipe(
      switchMap((params) => {
        if (params['id'] === 'new') return of(new Customer());
        return this.customerService.get(params['id']);
      }),
      map((customer) => {
        if (!customer.addressShipId) {
          customer.addressShipId = new Address();
        }
        return customer;
      })
    );
  }

  onCreate(customer: Customer) {
    // first create addressBill, then create addressShip, then create customer
    this.addressService.create(customer.addressBillId).subscribe({
      next: (address) => {
        customer.addressBillId._id = address._id;
        this.addressService.create(customer.addressShipId).subscribe({
          next: (address) => {
            customer.addressShipId._id = address._id;
            this.customerService.create(customer).subscribe({
              next: (customer) => {
                this.router.navigate([['/', 'vasarlok']]);
              },
              error: (err) => {
                console.error(err);
              }
            });
          },
          error: (err) => {
            console.error(err);
          }
        });
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  onUpdate(customer: Customer, form: NgForm) {
    const addressBill = customer['addressBillId'];
    this.addressService.update(addressBill).subscribe({
      next: (address) => {
      },
      error: (err) => {
        console.log(err);
      },
    });

    const addressShip = customer['addressShipId'];
    if (addressShip._id === 'new') {
      this.addressService.create(addressShip).subscribe({
        next: (address) => {
          console.log(address);
          addressShip._id = address._id;
          customerUpdate();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.addressService.update(addressShip).subscribe({
        next: (address) => {
          customerUpdate();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }

    const customerUpdate = () => {
      const customerToUpdate = {
        ...customer,
        addressBillId: addressBill._id,
        addressShipId: addressShip._id,
      };
      this.customerService.update(customerToUpdate as any).subscribe({
        next: (customer) => this.router.navigate(['/', 'vasarlok']),
        error: (err) => console.error(err),
      });
    };
  }
}
