import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { ConfigService } from 'src/app/service/config.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  columns = this.config.customerTableColumns;

  list$ = this.customerService.getAll();

  constructor(
    private config: ConfigService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSelectOne(customer: Customer): void {
    this.router.navigate(['/', 'vasarlo-szerkesztes', customer._id]);
  }

  onDeleteOne(customer: Customer): void {
    if (confirm('Biztosan törli ezt a vásárlót?')) {
      this.customerService.delete(customer._id).subscribe({
        next: () => (this.list$ = this.customerService.getAll()),
        error: (err) => console.error(err),
      });
    }
  }

  onCreateOne(): void {
    this.router.navigate(['/', 'vasarlo-szerkesztes', 'new']);
  }
}
