import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/model/address';
import { AddressService } from 'src/app/service/address.service';
import { ConfigService } from 'src/app/service/config.service';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  columns = this.config.addressTableColumns;

  list$ = this.addressService.getAll();

  constructor(
    private config: ConfigService,
    private addressService: AddressService,
    private router: Router
  ) {}


  ngOnInit(): void {
  }

  onSelectOne(address: Address): void {
    this.router.navigate(['/', 'cim-szerkesztes', address._id]);
  }

  onDeleteOne(address: Address): void {
    if (confirm('Biztosan törli ezt a címet?')) {
      this.addressService.delete(address._id).subscribe({
        next: () => (this.list$ = this.addressService.getAll()),
        error: (err) => console.error(err),
      });
    }
  }

  onCreateOne(): void {
    this.router.navigate(['/', 'cim-szerkesztes', 'new']);
  }

}
