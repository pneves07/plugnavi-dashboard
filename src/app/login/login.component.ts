import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChargingStationService } from '../services/charging-stations.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  model: any = {
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ChargingStationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    console.log(this.loginForm.value)
    //this.model.username = this.;
    this.service.login(this.loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        if (response.role.includes("Admin")){
          console.log('Login successful', response);
          this.service.saveUserIdToStorage(response.token);
          this.router.navigate(['/home']);
        } else {
          alert('Não tem autorização para aceder à dashboard.');
        }
      },
      (error) => {
        if(error.status == 401){
          console.error('erro 401', error);

        }
        console.error('Login failed', error);
      }
    );
  }

  /*
  login(): void {
    if (this.loginForm.valid) {
      // Adicione sua lógica de login aqui
      console.log('Login realizado com:', this.loginForm.value);
      this.router.navigate(['/home']);
    }
  }
  */
}
