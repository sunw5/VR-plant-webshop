import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  columns = this.config.billTableColumns;

  list$ = this.billService.getAll();

  constructor(
    private config: ConfigService,
    private billService: BillService,
    private router: Router
  ) {}


  ngOnInit(): void {
  }

  onSelectOne(order: Bill): void {
    this.router.navigate(['/', 'szamla-szerkesztes', order._id]);
  }

  onDeleteOne(order: Bill): void {
    if (confirm('Biztosan törli ezt a számlát?')) {
      this.billService.delete(order._id).subscribe({
        next: () => (this.list$ = this.billService.getAll()),
        error: (err) => console.error(err),
      });
    }
  }

  onCreateOne(): void {
    this.router.navigate(['/', 'szamla-szerkesztes', 'new']);
  }
}
