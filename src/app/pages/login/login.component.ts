import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  login(): void {
  if (!this.username || !this.password) {
    this.errorMessage = 'Por favor llena todos los campos.';
    return;
  }

  this.authService.login(this.username, this.password).subscribe({
    next: data => {
      console.log('✅ LOGIN OK', data);
      this.storageService.setToken(data.accessToken);  // 👈 aquí estaba el error
      this.storageService.setUser(data.username);
      this.router.navigate(['/home']);
    },
    error: err => {
      this.errorMessage = 'Credenciales incorrectas o servidor fuera de línea.';
      console.error(err);
    }
  });
}

togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

    logout() {
  this.router.navigate(['']);
}
}
