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
  imports: [SharedComponents, FormsModule, CommonModule, CpfCnpjMaskDirective, ToastComponent],
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
      this.errorMessage = 'Nome é obrigatório.';
      return false;
    }
    if (!email.trim() || !emailRegex.test(email)) {
      this.errorMessage = 'Email é obrigatório.';
      return false;
    }
    if (!emailRegex.test(email)) {
      this.errorMessage = 'Email inválido.';
      return false;
    }
    if (!password.trim() || password.length < 6) {
      this.errorMessage = 'Senha deve ter pelo menos 6 caracteres.';
      return false;
    }
    if (confirmPassword !== password) {
      this.errorMessage = 'As senhas não coincidem.';
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
    if (this.validateForm()) {
      this.apiService.post('users', this.registerForm).subscribe(
        (response) => {
          this.toast.show('Cadastro realizado com sucesso!', 'success');
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    if (
      !this.registerForm.name.trim() ||
      !this.registerForm.email.trim() ||
      !this.registerForm.password.trim() ||
      !this.registerForm.confirmPassword.trim()
    ) {
      this.errorMessage = 'Erro ao enviar o formulário. Verifique os campos.';
    }
  }

  cloneForm(): void {
    const newForm = this.registerForm.clone();
  }
  iconLogo = '../../../../../assets/icons/hosthub_logo.png';
}
