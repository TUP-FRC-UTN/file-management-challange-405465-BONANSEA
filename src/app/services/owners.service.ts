import { Injectable } from '@angular/core';
import { FileOwner } from '../../models/file.item.model';
import { OWNERS } from '../../data/file.storage';
@Injectable({
  providedIn: 'root',
})
export class OwnersService {
  getOwners(): FileOwner[] {
    return OWNERS;
  }
}