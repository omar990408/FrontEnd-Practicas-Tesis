import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    "username": "",
    "password": ""
  }

  constructor(private snack: MatSnackBar, private loginService : LoginService) { }

  formSubmit(){
    if(this.loginData.username.trim() == "" || this.loginData.username == null){
      this.snack.open("Nombre de usuario es requerido !!", "Aceptar", {
        duration: 3000
      });
      return;
    }
    if(this.loginData.password.trim() == "" || this.loginData.password == null){
      this.snack.open("Contraseña es requerida !!", "Aceptar", {
        duration: 3000
      });
      return;
    }
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user:any) => { 
            console.log(user);
          },error => {
            console.log(error);
          }
        );
      },error => {
        console.log(error);
      }
    )
  }

}
