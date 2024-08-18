import { Injectable } from '@angular/core';
import { API } from '../../global';
export interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}
  login(Credentials: User) {
    return fetch(`${API}/users/login`, {
      method: 'POST',
      body: JSON.stringify(Credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  }
}
