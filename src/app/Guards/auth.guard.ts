import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { StorageService } from '../Services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  private IsAuthenticated!: boolean;

  constructor(private router: Router, private _storage: StorageService) { }

  public canLoad(): boolean {

    if (!this._storage._IsAuth()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
