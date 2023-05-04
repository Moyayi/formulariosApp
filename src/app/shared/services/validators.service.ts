import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { Observable, delay, of } from "rxjs";

@Injectable( {providedIn : 'root'})

export class ValidatorsService implements AsyncValidator{
    
    validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
        console.log(control)
        return of({prueba : null})
    }

    public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


    public cantBeStrider = ( control : FormControl ) : ValidationErrors | null => {
        const value : string = control.value.trim().toLowerCase();
    
        if(value === 'strider' ){
            return {
                noStrider : true,
            }
        
        }
    
        return null;
    } 

    public isValidField( field : string, form : FormGroup ) : boolean | null{
        return form.controls[field].errors && form.controls[field].touched
    }

    public equalPassword( pass1 : string, pass2 : string ){
        return ( formGroup : AbstractControl <any,any> ) : ValidationErrors | null  => {
            const fieldValue1 = formGroup.get(pass1)?.value
            const fieldValue2 = formGroup.get(pass2)?.value
            
            if( fieldValue1 !== fieldValue2){
                console.log("contraseña no son iguales")
                formGroup.get(pass2)?.setErrors({notEqual : true})
                return {notEqual : true}
            }
            formGroup.get(pass2)?.setErrors(null)
            return null
        }
    }

}