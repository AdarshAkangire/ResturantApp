import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit 
{
  signupForm!: FormGroup
  private _Url:any="http://localhost:5100"
  constructor(private formbuilder: FormBuilder, private _http:HttpClient, private _router:Router) 
  { }

  ngOnInit(): void 
  {
    this.signupForm = this.formbuilder.group({
      name:['',[Validators.required,this.nameValidator]],
      email:['',[Validators.required,this.EmailValidator]],
      mobile:['',[Validators.required,Validators.maxLength,Validators.minLength,this.phoneValidator]],
      password: ['',[Validators.required,this.PasswordValidator]]
    })
  }

  signUp()
  {
    this._Url=this._Url+"/"+"SignUp"
    this._http.post<any>(this._Url,this.signupForm.value).subscribe(res=>{
      console.log(res)
      alert('Signup Successfully');
      this.signupForm.reset();
      this._router.navigate(['/login']);
    }), (err: any)=>{
      console.log(err);
      alert('Signup Error');
    }
  }

nameValidator(control:AbstractControl): {[key:string]:any} | null
{
  let cn=0;
  if(control.value!=" ")
  {
  for(let i=0;i<control.value.length;i++)
  {
  if((control.value[i]>='a' && control.value[i]<='z')||(control.value[i]>='A' && control.value[i]<='Z'))
  {
    cn++
  } 
}
}
  if(cn!=control.value.length && control.value!=" ")
  return {"nameInvalid":true}
  else
  return null
}

EmailValidator(control:AbstractControl):{[key:string]:any} | null
{
  let i=0;
  let arr:any;
  let cnt=0;
  let cnt2=0;
  let len=0;
  let value=0;

  if(control.value!=" ")
  {
  for(;i<control.value.length;i++)
  {
    if(control.value[i]=='@')
    {
      break
    }
    if(/^[A-Za-z0-9]/.test(control.value[i]))
    {
      cnt++;
    }
  }
  }
  if((cnt!=3&&control.value.length!=0))
  {
  return{"alphaNumericValidator":true}
  }
  else
  {
  if(control.value.includes('.'))
    {
      len=control.value.indexOf("@")
     arr=control.value.substr(len+1,control.value.length)
     arr=arr.split(".")
     console.log(arr[0])
     console.log(arr[1])
     
     if(!((arr[0].length>=1)&&(arr[1].length>=2))||(arr[0]==" "))
     {
      return{"dotValidator":true}    
     }
     else
     {
      return null
     }
    }
  else
  return null 
}
}

phoneValidator(control:AbstractControl):{[key:string]:any} | null
{
  let i=0;
  if(control.value!=" ")
  {
    for(;i<control.value.length;i++)
    {
      if(isNaN(control.value[i]))
      {
        break;
      }
    }
  }
  if(i!=control.value.length&&control.value!=" ")
  {
  return {"DigitValidator":true}
  }
  else
  {
  if(control.value.length!=10&&control.value!=""&&control.value!=" ")
  {
  return {"LengthValidator":true}
  }
  else
  {
  return null
  }
  }
}

PasswordValidator(control:AbstractControl):{[key:string]:any} | null
{
  
  let i=0;
  let Capital=0;
  let Numeric=0;
  let SpecialCh=0;
  if(control.value!=" ")
  {
  for(;i<=control.value.length;i++)
  {

    if(i==10)
    {
      break;
    
    }
    if(/^[A-Z]/.test(control.value[i]))
    {
      Capital++;

    }
    if(/^[0-9]/.test(control.value[i]))
    {
      Numeric++;

    }
    if(/[`!@#$%^&*(_)-+[{},.<~;:"'=]/.test(control.value[i]))
    {

      SpecialCh++;

    }
  }
}
  if(control.value.length!=0)
  {
    if(control.value.length<10)
    {
    return {"PasswordLengthValidator":true}
    }
    else
    {
    if(Capital==0)
    {
      return {"capitialValidator":true};
    }
    if(Numeric==0)
    {
      return {"numericValidator":true}
    }
    if(SpecialCh==0)
    {
      return {"specialCharacterValidator":true}
    }
    return null
  }
}
else
{
  return null;
}
}
}

