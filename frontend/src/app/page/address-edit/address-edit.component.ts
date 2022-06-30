import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Address } from '../../model/address';
import { AddressService } from '../../service/address.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.scss']
})
export class AddressEditComponent implements OnInit {
  address$!: Observable<Address>;
  constructor(
    private addressService: AddressService,
    private aRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.address$ = this.aRoute.params.pipe(
      switchMap((params) => {
        if (params['id'] === 'new') return of(new Address());
        return this.addressService.get(params['id']);
      }
      )
    );
  }

  onCreate(address: Address) {
    this.addressService.create(address).subscribe(
      () => {
        this.router.navigate(['/', 'cimek']);
      }
    );
  }

  onUpdate(address: Address, form: NgForm) {
    this.addressService.update(address).subscribe(
      () => {
        this.router.navigate(['/', 'cimek']);
      }
    );
  }

}
