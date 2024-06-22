import { Injectable } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { }

  public Data : any = {};

  private sharedData: any;

  public SetData(Key: string, Value : any):void{
     return this.Data[Key] = Value;
  }

  public GetData(Key: any):Task{
    return this.Data[Key];
  }
  
  public UpdateData(Key: any, UpdateKey : string, UpadteValue : any):Task{
    return this.Data[Key][UpdateKey] = UpadteValue;
  }
  
  public DeletData(Key: any):any{
    return delete this.Data.Key
  }


  // **** Share Policy Id ****

  setSharedData(data: any): void {
    this.sharedData = data;
  }

  getSharedData(): any {
    return this.sharedData;
  }

}
