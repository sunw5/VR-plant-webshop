import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {
  order$!: Observable<Order>;

  constructor(
    private orderService: OrderService,
    private aRoute: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.order$ = this.aRoute.params.pipe(
      switchMap((params) => {
        if (params['id'] === 'new') return of(new Order());
        return this.orderService.get(params['id']);
      }
      )
    );
  }

  onCreate(order: Order) {
    const orderToCreate = { ...order, customerId: order.customerId._id, productId: order.productId._id };
    this.orderService.create(orderToCreate as any).subscribe(
      () => {
        this.router.navigate(['/', 'rendelesek']);
      }
    );
  }

  onUpdate(order: Order, form: NgForm) {
    this.orderService.update(order).subscribe(
      () => {
        this.router.navigate(['/', 'rendelesek']);
      }
    );
  }

}
