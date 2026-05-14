import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FirstKeyPipe } from '../../shared/pipes/first-key-pipe';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule, FirstKeyPipe],
  templateUrl: './registration.html',
  styles: ``,
})
export class Registration {
  isSubmitted:boolean = false;
  formBuilder = inject(FormBuilder);

  private authService : AuthService = inject(AuthService);

  passwordMatchValidator: ValidatorFn = (control: AbstractControl) : null => 
  {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if(password && confirmPassword && password.value != confirmPassword.value)
      confirmPassword?.setErrors({passwordMismatch:true})
    else
      confirmPassword?.setErrors(null)
    
    return null;
  }

  form = this.formBuilder.group({
    fullName :
    ['',
       Validators.required
    ],
    email :
    ['',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password : 
    ['',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/(?=.*[^a-zA-Z0-9])/)
      ]
    ],
    confirmPassword :
    [''],
  }, {validators: this.passwordMatchValidator})

  
  onSubmit(){
    this.isSubmitted = true;
    if(this.form.valid){
      this.authService.createUser(this.form.value)
      .subscribe({
        next: (response : any) => {
          if(response.succeded)
          {
            this.form.reset();
            this.isSubmitted = false;
          }
          console.log(response);
        },
        error: error => console.log('error', error)
      });
      console.log(this.form.value);
    }
  }

  hasDisplayableError(controlName: string):Boolean{
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched))
  }
}
