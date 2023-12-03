import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { RestaurentData } from '../restaurent-dash/restaurent.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService 
{
  [x: string]: any;
private _Url:any="http://localhost:5100/RestroInfo"
private _Xurl:any="http://localhost:5100/RestroInfoAdd";

  constructor(private _http: HttpClient) 
  {

  }
  //GET request
  getRestaurent() 
  {
    return this._http.get<any>(this._Url)
  }
  
  deleteRestaurant(id:number) 
  {
    this._Url=this._Url+"/"+id;

    return this._http.get<any>(this._Url)
    
  }

  
  addRestaurent(data:any) 
  {
    console.log("inside add resturant");
    return this._http.post<any>(this._Xurl,data)
  }

  //update request
  updateRestaurant(data: any) 
  {
    console.log("inside update from service")
   return this._http.post<any>(this._Url,data)
  }
  
}
