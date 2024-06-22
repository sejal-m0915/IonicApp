import { Injectable } from '@angular/core';
import { AuthDirective } from '../Directives/auth.directive';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage!: Storage | null;

  constructor() {
    this.init();
  }

  async init() {
    const storage = window.sessionStorage;
    this._storage = storage;
  }


  public set(key: string, value: any) {
    value = AuthDirective.StringEncryptor(value, "AES")
    this._storage!.setItem(key, value);
    return { success: true, key: key, value: value };
  }

  public get(key: string) {
    let value: string | boolean | null = this._storage!.getItem(key);
    if (value) {
      value = AuthDirective.StringDecryptor(value!, "AES")
      value == "true" ? value = true : '';
      value == "false" ? value = false : '';
      return { success: true, key: key, value: value };
    } else {
      return { success: false, key: key, value: null };
    }
  }

  public remove(key: string) {
    this._storage!.removeItem(key);
    return { success: true, key: key };
  }

  public clear() {
    this._storage!.clear();
    return { success: true };
  }

  public AllKeys() {
    const val = Object.keys(this._storage!);
    return { success: true, keysArr: val };
  }

  public length() {
    const length = this._storage!.length;
    return { success: true, length: length };
  }

  public _IsAuth() {
    if (!!this.get("Access_Token").value && this.get("IsAuth").value) {
      return true
    } else {
      return false
    }
  }

}
