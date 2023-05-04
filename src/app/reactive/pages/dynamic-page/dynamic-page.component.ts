import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  public myForm : FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames : this.fb.array([
      ['Metal Gear', Validators.required],
      ['World of Warcraft', Validators.required]
    ]),


  })

  public newFavorite : FormControl = new FormControl('', [Validators.required])

  constructor( 
    private fb : FormBuilder,
    private validatorService : ValidatorsService
  ){}

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray
  }

  isValidField( field : string ) : boolean | null{
    return this.validatorService.isValidField(field, this.myForm)
  }

  getFieldError(field : string ) : string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ){
        case "required": 
          return "Campo obligatorio"
        
        case "minlength":
          return `Este campo mínimo debe de tener ${ errors['minlength'].requiredLength} de longitud` 
      }
    }
    return null;
  }


  onAddToFavorites():void{
    if( this.newFavorite.invalid){
      return;
    }
    this.favoriteGames.push(
      this.fb.control(this.newFavorite.value , Validators.required)
    )

    this.newFavorite.reset();
  }

  onDeleteFavorite( index : number ) : void {
    this.favoriteGames.removeAt(index)
  }
  onSubmit():void{
    if( this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return ; 
    }
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([])
    this.myForm.reset()
  }

}
