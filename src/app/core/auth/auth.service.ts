import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated: boolean = false;

  constructor() {}
}
