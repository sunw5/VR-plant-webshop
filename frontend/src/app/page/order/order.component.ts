import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order';
import { ConfigService } from 'src/app/service/config.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  columns = this.config.orderTableColumns;
  list$ = this.orderService.getAll();

  constructor(
    private config: ConfigService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  onSelectOne(order: Order): void {
    this.router.navigate(['/', 'rendeles-szerkesztes', order._id]);
  }

  onDeleteOne(order: Order): void {
    if (confirm('Biztosan törli ezt a rendelést?')) {
      this.orderService.delete(order._id).subscribe({
        next: () => (this.list$ = this.orderService.getAll()),
        error: (err) => console.error(err),
      });
    }
  }

  onCreateOne(): void {
    console.log('onCreateOne');
    this.router.navigate(['/', 'rendeles-szerkesztes', 'new']);
  }
}
