import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  public registrarUsuario(user:any) : Observable <any> {
    return this.httpClient.post(`${baseUrl}/usuarios/`, user);
  }
}