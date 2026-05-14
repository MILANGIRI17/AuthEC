import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AuthService
{
  
  private baseUrl: string = "http://localhost:5028/api";
  private authECApi: HttpClient = inject(HttpClient)

  createUser(formData : any){
    return this.authECApi.post(this.baseUrl + "/signup", formData)
  }
}
