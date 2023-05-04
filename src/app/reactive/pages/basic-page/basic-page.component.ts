import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

const product = {
  name      : 'RTX 4090',
  price     : 2000,
  inStorage : 6
}


@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit{
  
  public myForms : FormGroup = this.fb.group({
    name      : ['', [ Validators.required, Validators.minLength(3),  ] ],
    price     : [0, [Validators.required, Validators.min(0)] ],
    inStorage : [0, [Validators.required, Validators.min(0)] ],
  })
  constructor( 
    private fb : FormBuilder,
    private validatorService : ValidatorsService
  ){}

  ngOnInit(): void {
    // this.myForms.reset( product )
  }

  isValidField( field : string ) : boolean | null{
    return this.validatorService.isValidField(field, this.myForms)
  }

  getFieldError(field : string ) : string | null {

    if ( !this.myForms.controls[field] ) return null;

    const errors = this.myForms.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ){
        case "required": 
          return "Campo obligatorio"
        
        case "minlength":
          return `Este campo mínimo debe de tener ${ errors['minlength'].requiredLength} de longitud` 
      }
    }


    return "Hola mundo";
  }

  onSave():void{
    if( this.myForms.invalid ){
      this.myForms.markAsTouched();
      return
    };
    console.log(this.myForms.value)

    this.myForms.reset({price:0 , inStorage : 0})
  }
}
