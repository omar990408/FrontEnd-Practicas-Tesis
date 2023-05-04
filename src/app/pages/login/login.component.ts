import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  constructor(private snack: MatSnackBar, private loginService : LoginService, private router: Router ) { }

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
            this.loginService.setUser(user);
            console.log(user);
            if(this.loginService.getUserRole() == 'ADMIN'){
              // window.location.href = '/admin';
              this.router.navigate(['/admin']);
            }else if(this.loginService.getUserRole() == 'NORMAL'){
              // window.location.href = '/user-dashboard';
              this.router.navigate(['/user-dashboard']);
            }else{
              this.loginService.logout();
            }
          },error => {
            console.log(error);
          }
        );
      },error => {
        console.log(error);
        this.snack.open("Datos incorrectos !!", "Aceptar", {duration: 3000});
      }
    )
  }

}
