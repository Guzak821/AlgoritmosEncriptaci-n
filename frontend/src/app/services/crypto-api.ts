import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CryptoApiService {
  constructor(private http: HttpClient) {}

  postEncrypt(mensaje: string) {
    return this.http.post('http://localhost:3000/crypto/encrypt-symmetric', { message: mensaje });
  }

  postHash(mensaje: string, tipo: string) {
  return this.http.post('http://localhost:3000/crypto/hash', { 
    message: mensaje, 
    type: tipo 
  });
}
}