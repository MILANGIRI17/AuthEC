import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  isSubmitted: boolean = false;

  service: AuthService = inject(AuthService);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);

  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.service.singin(this.form.value).subscribe({
        next: (res: any) => {
          this.service.saveToken(res.token);
          this.router.navigateByUrl('/dashboard');
        },
        error: (err: any) => {
          if (err.status == 400) {
            this.toastr.error('Incorrect email or password','Login failed');
          }
          console.log('error: ', err)
        }
      });
    }
  };

  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
  }
}
