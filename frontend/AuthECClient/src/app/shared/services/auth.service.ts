import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TOKEN_KEY } from '../constants';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private baseUrl: string = "http://localhost:5028/api";
  private authECApi: HttpClient = inject(HttpClient)

  createUser(formData: any) {
    return this.authECApi.post(this.baseUrl + "/signup", formData)
  }

  singin(formData: any) {
    return this.authECApi.post(this.baseUrl + "/signin", formData)
  }

  isLoggedIn() {
    return localStorage.getItem(TOKEN_KEY) != null ? true : false;
  }

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
