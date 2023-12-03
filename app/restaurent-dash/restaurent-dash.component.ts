import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder  } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import {RestaurentData} from './restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})

export class RestaurentDashComponent implements OnInit {

  formValue!:FormGroup
  restaurentModelObj : RestaurentData = new RestaurentData;
  allRestaurentData: any;
  showAdd!:boolean;
  showBtn!:boolean;

  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    })
    this.getAllData();
  }

 clickAddResto()
  {
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = false;
  }
 
  addRestaurent()
  {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    /*this.api.postRestaurent(this.restaurentModelObj).subscribe(res => {
      console.log(res);
      alert("Restaurent Added Successfully");
      this.formValue.reset();

      let ref= document.getElementById('close');
      ref?.click();

      this.getAllData();

    }, err=>{
      console.log(err);
      alert("Restaurent Added Failed!");
    })*/
    this.api.addRestaurent(this.restaurentModelObj).subscribe((res:any)=>
    {
      alert("Restaurent added Successfully");

      this.formValue.reset();

      let ref= document.getElementById('close');
      ref?.click();
      location.reload();


    })
  }

  getAllData()
  {

    this.api.getRestaurent().subscribe(res => {
      this.allRestaurentData= res;
    }, err=>{
      console.log(err);
    })

  }

  deleteResto(data: any)
  {
    this.api.deleteRestaurant(data).subscribe((res: any) => {
      console.log(res);
      if(res.deletedCount==0)
      {
      alert("Delete operation is failed");
      }
      else
      {
      alert("Selected data is deleted successfully");
      location.reload();
      //this.getAllData();
      }
    })
  }

  onEditResto(data: any)
  {
    this.showAdd = false;
    this.showBtn = true;
    
    this.restaurentModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.Info.name);
    this.formValue.controls['email'].setValue(data.Info.email);
    this.formValue.controls['mobile'].setValue(data.Info.mobile);
    this.formValue.controls['address'].setValue(data.Info.address);
    this.formValue.controls['services'].setValue(data.Info.services);

 
  }
  updateResto(){
    console.log("inside update from component")
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurentModelObj).subscribe((res: any) => {
      alert("Restaurent Updated Successfully");
      this.formValue.reset();

      let ref= document.getElementById('close');
      ref?.click();
      location.reload();

    })
    
  }

  
}
