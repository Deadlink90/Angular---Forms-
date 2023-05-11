import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

  interface errorInterface {
    [s:string]:boolean
    }

@Injectable({
  providedIn: 'root'
})


export class ValidatorsService {

  

  constructor() { }

  //validacion personalizada
  noHerrera(control:FormControl):{[s:string]:boolean} | null  {
    if(control.value?.toLowerCase() === 'herrera'){
    return{
    noHerrera:true  
    }
    }
    return null;
  }

  samePasswords(pass1name:string,pass2name:string){

   return ( formGroup:FormGroup ) => {
   const PASS1CONTROL = formGroup.controls[pass1name];
   const PASS2CONTROL = formGroup.controls[pass2name];

   if(PASS2CONTROL.value !== PASS1CONTROL.value){
    //si el pass2 es igual al 1, pass2 no tendra errores
    PASS2CONTROL.setErrors({ noEsIgual:true })
   
   } else {
    //de lo contrario colocar error "noEsIgual"
    PASS2CONTROL.setErrors(null)
   
   }
   }
  }

  //validacion asincrona
  existeUsuario(control: FormControl): Promise<errorInterface | null> {

    if(!control.value){
     return Promise.resolve(null)
    }

    return new Promise<errorInterface | null>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'strider') {
          resolve({ existe: true });
        } else {
          resolve(null);
        }
      }, 3500);
    });
  }
  


}
