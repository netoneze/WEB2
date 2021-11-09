import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IResetPassword } from './exercicios.interface';
import { ILogin } from './Interfaces/login.interface';
import { HttpClientService } from './http-client.service';
import { IEmail } from '../components/initial/forgot-password/forgot-password.component';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  user: IUser = {} as IUser;
  rot: string = 'auth';

  constructor(private httpClientService: HttpClientService) {}

  login(login: ILogin): Observable<Object> {
    const stringify = JSON.stringify(login);
    const loginJson = JSON.parse(stringify);

    return this.httpClientService.post('authenticate', loginJson);
  }

  getUser(): IUser {
    const res = localStorage.getItem('user');

    if (res) {
      this.user = JSON.parse(res);
    }
    return this.user;
  }

  getUserById(_id: string): Observable<Object> {
    return this.httpClientService.get('', _id);
  }

  updateUser(idUser: string, user: IUser): Observable<Object> {
    const stringify = JSON.stringify(user);
    const userJSON = JSON.parse(stringify);

    return this.httpClientService.patch('update', userJSON, idUser);
  }

  forgotPassword(email: IEmail): Observable<Object> {
    const stringify = JSON.stringify(email);
    const emailJSON = JSON.parse(stringify);

    return this.httpClientService.post('forgot_password', emailJSON);
  }

  resetPassword(resetPassword: IResetPassword) {
    console.log(resetPassword);

    const stringify = JSON.stringify(resetPassword);
    const passJSON = JSON.parse(stringify);

    return this.httpClientService.post('reset_password', passJSON);
  }
}
