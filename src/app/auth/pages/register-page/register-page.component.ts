import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/services/email-validators.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import * as customValidators from 'src/app/shared/validators/validators.functions';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm : FormGroup = this.fb.group({
    name : ['', [ Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
    email : ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [new EmailValidatorService()]],
    username : ['', [Validators.required, customValidators.cantBeStrider]],
    password : ['', Validators.required, Validators.minLength(6)],
    password2 : ['', Validators.required]
  },{
    validators: [
      this.validatorService.equalPassword('password', 'password2')
    ]
  })

  constructor(
    private fb : FormBuilder,
    private validatorService : ValidatorsService
  ){}

  isValidField( field : string ) : boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  onSubmit(){
    this.myForm.markAllAsTouched()
  }
}
