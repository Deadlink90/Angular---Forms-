import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private validService: ValidatorsService
  ) {}

  ngOnInit(): void {
    // this.formInit();
  }
  //crear el formulario
  forma: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(5)]],
    apellido: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        this.validService.noHerrera,
      ],
    ],
    correo: [
      '',
      [
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        Validators.required,
      ],
    ],
    usuario:['', , this.validService.existeUsuario],
    pass1: ['', [Validators.required, Validators.minLength(5)] ],
    pass2: ['', Validators.required],
    direccion: this.fb.group({
      distrito: ['', Validators.required],
      ciudad: ['', Validators.required],
    }),
    pasatiempos: this.fb.array([])
  },{
   validators:this.validService.samePasswords('pass1','pass2') 
  });

  //asignar datos al formulario
  formInit() {
    this.forma.setValue({
      nombre: 'El pepe',
      apellido: 'Pepe Apellido',
      correo: 'pepe@gmail.com',
      direccion: {
        distrito: 'pepe distrito',
        ciudad: 'pepe ciudad',
      },
    });
  }

  checkErrors(input: string, error: string) {
    return this.forma.get(input)?.errors?.[error];
  }

  //enviar el formulario
  sendReactive() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        }
        control.markAsTouched();
      });
    }
    //envio de informacion
    console.log(this.forma);

    this.forma.reset({
      nombre: 'por defecto',
      apellido: 'por defecto',
      correo: 'example@gmail.com',
      direccion: {
        ciudad: 'por defecto',
        distrito: 'por defecto',
      },
    });
  }

  //recuperar el array de pasatiempos
  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  //agregar pasatiempo
  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control('', Validators.required));
  }

  //borrar pasatiempo
  borrarPasatiempo(indice: number) {
    this.pasatiempos.removeAt(indice);
  }

  get nombreValidator() {
    return (
      this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched
    );
  }

  get apellidoValidator() {
    return (
      this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched
    );
  }

  get correoValidator() {
    return (
      this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
    );
  }

  get usuarioNoValido(){
   return this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched
  }

  get distritoValidator() {
    return (
      this.forma.get('direccion.distrito')?.invalid &&
      this.forma.get('direccion.distrito')?.touched
    );
  }

  get ciudadValidator() {
    return (
      this.forma.get('direccion.ciudad')?.invalid &&
      this.forma.get('direccion.ciudad')?.touched
    );
  }

  get pass1Validator() {
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched;
  }

  get pass2Validator() {
    const pass1 = this.forma.get('pass1')?.value;
    const pass2 = this.forma.get('pass2')?.value;

    return pass1 === pass2 ? false : true;
  }
}
