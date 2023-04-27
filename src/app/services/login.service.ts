import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

  public generateToken(loginData:any) : Observable <any> {
    return this.httpClient.post(`${baseUrl}/generate-token`, loginData);
  }

  //Iniciamos sesión y establecemos el token en el local storage
  public loginUser(token:any){
    localStorage.setItem("token", token);
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem("token");
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  // Cerrar Sesión y eliminar el token del local storage
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }  

  // Obtener el token
  public getToken(){
    return localStorage.getItem("token");
  }

  // Establecer el usuario en el local storage
  public setUser(user:any){
    localStorage.setItem("user", JSON.stringify(user));
  }

  // Obtener el usuario
  public getUser(){
    let userStrl = localStorage.getItem("user");
    if(userStrl != null){
      return JSON.parse(userStrl);
    }else{
      this.logout();
      return null;
    }
  }

  // Obtener el rol
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser(): Observable<any>{
      return this.httpClient.get(`${baseUrl}/actual-usuario`);
  }
}

