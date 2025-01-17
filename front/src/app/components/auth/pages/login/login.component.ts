import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponents } from '../../../../shared/shared.components';
import { AuthService } from './auth.service';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponents,
    ToastComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent {
  @ViewChild('toast') toast!: ToastComponent;
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.initForm();
  }

  ngOnInit(): void {}

  navigateToForgotPassword() {
    this.router.navigate(['/esqueceu-senha']);
  }

  navigateToRegister() {
    this.router.navigate(['/cadastro']);
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;

    this.auth.login(loginData).subscribe(
      (response) => {
        sessionStorage.setItem('access_token', response.access_token);
        this.toast.show('Login realizado com sucesso!', 'success');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      (error) => {
        this.toast.show(
          'Erro ao fazer login. Verifique suas credenciais.',
          'error'
        );
      }
    );
  }
}
