import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, delay, of, subscribeOn } from "rxjs";

@Injectable({providedIn : 'root'})
export class EmailValidatorService implements AsyncValidator{

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const email = control.value
        const httpCallObversable  = new Observable<ValidationErrors | null>( ( suscriber ) => {
            if( email === 'pedro@gmail.com'){
                suscriber.next({ 
                    emailTaken : {
                        message : 'Correo en uso'
                    }
                });
                suscriber.complete();
            }

            suscriber.next(null);
            suscriber.complete();
        }).pipe(delay(2000))
        return httpCallObversable
        
    }
    // registerOnValidatorChange?(fn: () => void): void {
    //     throw new Error("Method not implemented.");
    // } 



}