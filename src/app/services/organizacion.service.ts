import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrganizacionService {
  constructor(private http: HttpClient) {}
}
