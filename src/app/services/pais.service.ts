import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class PaisService {
  constructor(private httpClient:HttpClient) { }

  API_PAISES='https://restcountries.com/v3.1/lang/spanish';

  getPaises(){
    return this.httpClient.get(this.API_PAISES)
    
  }


}
