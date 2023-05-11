import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})

export class TemplateComponent implements OnInit{

constructor (private countryService:PaisService) {}

array:any = [];

ngOnInit(): void {
this.obtainCountries();
}

usuario = {
nombre:'Nombre',
apellido:'Apellido',
correo:'Correo@gmail.com',
pais:'',

}

guardar(form:NgForm){
//comprobar si el formulario es invalido
if (form.invalid) {
/*
la propuedad "controls" del formulario es un objeto que contiene
propiedades de todos los inputs, propiedades como touched, pristine
valid etc. Este es su formato: {nombre: FormControl, apellido: FormControl, correo: FormControl}
*/
Object.values( form.controls ).forEach(control => {
  control.markAsTouched();
}) 
/*
object.values devuelve un arreglo con los valores de un objeto
al aplicar Object.values a "controls" obtenemos este arreglo:
[FormControl, FormControl, FormControl], recorremos este arreglo
con forEach y marcamos todos los inputs como "touched"
*/
return;
}

console.log(form.value);



}  


obtainCountries(){
this.countryService.getPaises().subscribe( paises => {
this.array = paises;

this.array.unshift({
  cca3:'NCD',
  name:{
  common:'[ Selecciona un pais ]'  
  }  
})


} )  
}

}
