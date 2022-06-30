import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../model/address';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService<Address> {

  constructor(public override http: HttpClient) {
    super(http);
    this.entityName = 'address';
  }
}
