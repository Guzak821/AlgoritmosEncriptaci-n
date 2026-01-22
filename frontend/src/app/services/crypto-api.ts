import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CryptoApiService {
  constructor(private http: HttpClient) {}

  postSymmetric(mensaje: string, tipo: string, llave: string) {
    return this.http.post('http://localhost:3000/crypto/encrypt-symmetric', { 
      message: mensaje,
      type: tipo,
      key: llave
    })
  }

  postAsymmetric(mensaje: string, tipo: string, llave: string){
    return this.http.post('http://localhost:3000/crypto/encrypt-asymetric', {
      message: mensaje,
      type: tipo,
      key: llave
    }
   )
  }

  postHash(mensaje: string, tipo: string) {
  return this.http.post('http://localhost:3000/crypto/hash', { 
    message: mensaje, 
    type: tipo 
  });
}
  postDecrypt( mensaje: string, tipo: string, llave: string) {
    return this.http.post('http://localhost:3000/crypto/decrypt-symmetric', { 
      message: mensaje,
      type: tipo,
      key: llave
    })
  }
}