import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { IdentityAccessStore } from '../../../application/identity-access-store';

type AuthMode = 'login' | 'register';

@Component({
  selector: 'app-auth-page',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    TranslatePipe,
  ],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.css',
})
export class AuthPage {
  protected readonly store = inject(IdentityAccessStore);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  protected readonly mode = signal<AuthMode>('login');
  protected readonly showPassword = signal(false);
  protected readonly showConfirmPassword = signal(false);
  protected readonly successMessage = signal<string | null>(null);
  protected readonly passwordRules = signal<string[]>([
    'Minimo 8 caracteres',
    'Al menos una mayuscula',
    'Al menos un numero',
    'Al menos un caracter especial',
  ]);

  protected readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    firstName: [''],
    lastName: [''],
    email: ['', [Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: [''],
  });

  protected submit(): void {
    if (this.store.loading()) return;
    this.successMessage.set(null);

    if (this.mode() === 'register') {
      this.applyRegisterValidators();
      this.syncPasswordMatchError();
    } else {
      this.applyLoginValidators();
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, firstName, lastName, email, password } = this.form.getRawValue();
    if (this.mode() === 'login') {
      this.store.login(username.trim(), password).subscribe({
        next: () => {
          void this.router.navigate(['/app/dashboard']);
        },
      });
      return;
    }

    this.store.registerAccount(email.trim(), password, {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
    }).subscribe({
      next: () => this.showLoginAfterRegistration(email.trim()),
    });
  }

  protected switchMode(nextMode: AuthMode): void {
    this.mode.set(nextMode);
    this.successMessage.set(null);
    this.showPassword.set(false);
    this.showConfirmPassword.set(false);
    this.form.reset();
    if (nextMode === 'login') {
      this.applyLoginValidators();
    } else {
      this.applyRegisterValidators();
    }
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  protected passwordsDoNotMatch(): boolean {
    if (this.mode() !== 'register') return false;
    const { password, confirmPassword } = this.form.getRawValue();
    return !!password && !!confirmPassword && password !== confirmPassword;
  }

  protected togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  protected toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.update((value) => !value);
  }

  protected syncPasswordMatchError(): void {
    const control = this.form.controls.confirmPassword;
    const errors = { ...(control.errors ?? {}) };
    if (this.passwordsDoNotMatch()) {
      control.setErrors({ ...errors, passwordMismatch: true });
      return;
    }
    delete errors['passwordMismatch'];
    control.setErrors(Object.keys(errors).length ? errors : null);
  }

  private applyLoginValidators(): void {
    this.form.controls.username.setValidators([Validators.required, Validators.minLength(3)]);
    this.form.controls.firstName.clearValidators();
    this.form.controls.lastName.clearValidators();
    this.form.controls.email.clearValidators();
    this.form.controls.confirmPassword.clearValidators();
    this.updateValidationState();
  }

  private applyRegisterValidators(): void {
    this.form.controls.username.clearValidators();
    this.form.controls.firstName.setValidators([Validators.required, Validators.minLength(2)]);
    this.form.controls.lastName.setValidators([Validators.required, Validators.minLength(2)]);
    this.form.controls.email.setValidators([Validators.required, Validators.email]);
    this.form.controls.confirmPassword.setValidators([Validators.required, Validators.minLength(8)]);
    this.updateValidationState();
  }

  private updateValidationState(): void {
    Object.values(this.form.controls).forEach((control) => control.updateValueAndValidity({ emitEvent: false }));
  }

  private showLoginAfterRegistration(email: string): void {
    this.mode.set('login');
    this.applyLoginValidators();
    this.form.reset({
      username: email,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    this.form.controls.username.markAsDirty();
    this.form.markAsUntouched();
    this.showPassword.set(false);
    this.showConfirmPassword.set(false);
    this.successMessage.set('Cuenta creada correctamente. Ahora inicia sesion con tu correo y contrasena.');
  }
}
