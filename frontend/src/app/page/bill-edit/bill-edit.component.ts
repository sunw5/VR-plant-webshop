import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Bill } from '../../model/bill';
import { BillService } from '../../service/bill.service';

@Component({
  selector: 'app-bill-edit',
  templateUrl: './bill-edit.component.html',
  styleUrls: ['./bill-edit.component.scss']
})
export class BillEditComponent implements OnInit {
  bill$!: Observable<Bill>;

  constructor(
    private billService: BillService,
    private aRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bill$ = this.aRoute.params.pipe(
      switchMap((params) => {
        if (params['id'] === 'new') return of(new Bill());
        return this.billService.get(params['id']);
      }
      )
    );
  }

  onCreate(bill: Bill) {
    const billToCreate = { ...bill, orderId: bill.orderId._id};
    this.billService.create(billToCreate as any).subscribe(
      () => {
        this.router.navigate(['/', 'szamlak']);
      }
    );
  }

  onUpdate(bill: Bill, form: NgForm) {
    this.billService.update(bill).subscribe(
      () => {
        this.router.navigate(['/', 'szamlak']);
      }
    );
  }

}
