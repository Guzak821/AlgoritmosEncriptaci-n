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

 /* postAsymmetric(mensaje: string, tipo: string, llave: string){
    return this.http.post('http://localhost:3000/crypto/encrypt-asymmetric', {
      message: mensaje,
      type: tipo,
      key: llave
    }
   )
  } */

  postHash(mensaje: string, tipo: string) {
  return this.http.post('http://localhost:3000/crypto/hash', { 
    message: mensaje, 
    type: tipo 
  });
}
  postDecrypt(message: string, type: string, key: string) {
  // Si el tipo es asymetric, debe ir a /decrypt-asymmetric
  const endpoint = type === 'asymetric' ? 'decrypt-asymmetric' : 'decrypt-symmetric';
  return this.http.post(`http://localhost:3000/crypto/${endpoint}`, { message, key });
}
  postAsymmetric(message: string, type: string, key: string) {
  return this.http.post(`http://localhost:3000/crypto/encrypt-asymmetric`, { message, key });
}

// Nueva función para generar llaves desde la UI
  generateKeys() {
  return this.http.post(`http://localhost:3000/crypto/generate-keys`, {});
  }

  postCustomEncrypt(mensaje: string, tipo: string, llave: string) {
    return this.http.post('http://localhost:3000/crypto/encrypt-custom', { 
      message: mensaje,
      type: tipo,
      key: llave
    })
  }

  postCustomDecrypt(message: string, type: string, key: string) {
    return this.http.post(`http://localhost:3000/crypto/decrypt-custom`, { message, key });
  }
}