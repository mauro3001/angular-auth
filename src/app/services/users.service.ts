import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { TokenService } from './token.service';
import { User } from '@models/user.model';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = environment.API_URL;
  tokenResult = this.token.getToken();

  headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.tokenResult}`
  );

  constructor(private http: HttpClient, private token: TokenService) {
  }

  getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/api/v1/users`, {
      context: checkToken(),
    });
  }
}