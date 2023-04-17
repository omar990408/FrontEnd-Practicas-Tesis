import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public user = {
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  }

  constructor(private userService:UserService, private snack:MatSnackBar) { }

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('EL nombre de Usuario es Obligatorio', 'Aceptar',{
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }
    this.userService.registrarUsuario(this.user).subscribe(data => {
      console.log(data);
      Swal.fire('Usuario Registrado', 'Usuario registrado con éxito', 'success');
    }, error => {
      console.log(error);
      this.snack.open('Error al registrar Usuario', 'Aceptar',{
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    }
    );
  }
  
}
