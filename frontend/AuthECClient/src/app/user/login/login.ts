import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  isSubmitted: boolean = false;


  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(){
    this.isSubmitted=true;
    console.log(this.form.value);
  };

   hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
  }
}
