import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterClientService {

  constructor(private http: HttpClient) { }

  registerClient(clientData: any): Observable<any> {
    return this.http.post('http://localhost:3000/register-client', clientData);
  }

}
