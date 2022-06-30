import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ConfigService } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  columns = this.config.productTableColumns;

  list$ = this.productService.getAll();

  constructor(
    private config: ConfigService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSelectOne(product: Product): void {
    this.router.navigate(['/', 'termek-szerkesztes', product._id]);
  }

  onDeleteOne(product: Product): void {
    if (confirm('Biztosan törli ezt a terméket?')) {
      this.productService.delete(product._id).subscribe({
        next: () => (this.list$ = this.productService.getAll()),
        error: (err) => console.error(err),
      });
    }
  }

  onCreateOne(): void {
    this.router.navigate(['/', 'termek-szerkesztes', 'new']);
  }
}
