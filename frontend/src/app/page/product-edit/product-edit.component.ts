import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, of, switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  product$!: Observable<Product>;

  constructor(
    private productService: ProductService,
    private aRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.product$ = this.aRoute.params.pipe(
      switchMap((params) => {
        if (params['id'] === 'new') return of(new Product());
        return this.productService.get(params['id'])
      })
    );
    
  }

  onCreate(product: Product) {
    this.productService
      .create(product)
      .subscribe((product) => this.router.navigate(['/', 'termekek']));
  }

  onUpdate(product: Product, form: NgForm) {
    this.productService
      .update(product)
      .subscribe({
        next: (product) => this.router.navigate(['/', 'termekek']),
        error: (err) => console.error(err),
      });
  }

}
