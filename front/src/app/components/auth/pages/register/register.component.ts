import { Component, ViewChild } from '@angular/core';
import { SharedComponents } from '../../../../shared/shared.components';
import { FormPrototype } from '../../../../shared/models/form-prototype.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../core/services/api.service';
import { Router } from '@angular/router';
import { CpfCnpjMaskDirective } from '../../../../shared/directive/cpf-cnpj-mask.directive';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-register',
  imports: [
    SharedComponents,
    FormsModule,
    CommonModule,
    CpfCnpjMaskDirective,
    ToastComponent,
  ],
  providers: [ApiService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
})
export class RegisterComponent {
  @ViewChild('toast') toast!: ToastComponent;
  registerForm: FormPrototype;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  iconLogo = '../../../../../assets/icons/hosthub_logo.png';

  constructor(private apiService: ApiService, private router: Router) {
    this.registerForm = new FormPrototype({
      name: '',
      cpf_cnpj: '',
      email: '',
      password: '',
      site: '',
      confirmPassword: '',
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  validateForm(): boolean {
    const { name, email, password, confirmPassword } = this.registerForm;
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2})?$/;

    if (!name.trim()) {
      this.toast.show('Nome é obrigatório.', 'error');
      return false;
    }
    if (!email.trim() || !emailRegex.test(email)) {
      this.toast.show('Email é obrigatório..', 'error');

      return false;
    }
    if (!emailRegex.test(email)) {
      this.toast.show('Email inválido.', 'error');

      return false;
    }
    if (!password.trim() || password.length < 6) {
      this.toast.show('Senha deve ter pelo menos 6 caracteres.', 'error');

      return false;
    }
    if (confirmPassword !== password) {
      this.toast.show('As senhas não coincidem.', 'error');

      return false;
    }

    this.errorMessage = null;
    return true;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = new FormPrototype({
      name: '',
      cpf_cnpj: '',
      email: '',
      password: '',
      site: '',
      confirmPassword: '',
    });
    this.successMessage = null;
    this.errorMessage = null;
  }

  onSubmit(): void {
    if (
      !this.registerForm.name.trim() ||
      !this.registerForm.email.trim() ||
      !this.registerForm.password.trim() ||
      !this.registerForm.confirmPassword.trim()
    ) {
      this.toast.show(
        'Erro ao enviar o formulário. Verifique os campos.',
        'error'
      );
    }

    if (this.validateForm()) {
      console.log(this.registerForm);
      this.apiService.post('users', this.registerForm).subscribe({
        next: () => {
          this.toast.show('Cadastro realizado com sucesso!', 'success');
          this.router.navigate(['/home']);
        },
        error: () => {
          this.toast.show('Erro ao registrar o usuário!', 'error');
        },
      });
    }
  }
}
