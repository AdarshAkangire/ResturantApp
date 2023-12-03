import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit 
{
  private _Url:any="http://localhost:5100/SignUpInfo"
  loginForm!: FormGroup;
  SignUpData:any;
  constructor(private formbuilder: FormBuilder, private _http:HttpClient, private _router:Router ) { }

  ngOnInit(): void 
  {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['']
    });
  }

  logIn() 
  {

      this._http.get<any>(this._Url).subscribe(res=>{
        console.log(res)
        this.SignUpData=res;
        let cn=0;
        for(let i=0;this.SignUpData.length;i++)
        {
          if((this.loginForm.value.email==this.SignUpData[i].EmailAddress)&&(this.loginForm.value.password==this.SignUpData[i].PassWord))
          {
            cn++;
            alert("logged in successfully");
            this.loginForm.reset() 
            this._router.navigate(['/restaurent']);
            break;
          }
          else
          {
            alert("you entered wrong credentials")
          }
        }
      }),
      (err: any)=>{
        console.log(err);
        alert('Signup Error');
      }
    }
  }
  

