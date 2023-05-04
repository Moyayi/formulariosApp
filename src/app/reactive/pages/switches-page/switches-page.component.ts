import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit{

  public myForm : FormGroup = this.fb.group({
    gender : [ '', Validators.required ],
    wantNotifications : [ false, Validators.requiredTrue ],
    termsAndConditions : [ false,  Validators.requiredTrue]
  })

  public person = {
    gender : 'F', 
    wantNotifications : ''
  }

  constructor( 
    private fb : FormBuilder,
    private validatorService : ValidatorsService
  ){}
  
  ngOnInit(){
    this.myForm.reset( this.person )
  }

  isValidField( field : string ) : boolean | null{
    return this.validatorService.isValidField(field, this.myForm)
  }

  onSave(){
    if ( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }
    this.person =  this.myForm.value;
    this.myForm.reset()
  }
}
