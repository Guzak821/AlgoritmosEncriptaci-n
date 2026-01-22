import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CryptoApiService } from '../../services/crypto-api';

@Component({
  selector: 'app-crypto-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crypto-form.html',
  styleUrl: './crypto-form.css'
})
export class CryptoFormComponent {
  // Variables vinculadas al HTML mediante [(ngModel)]
  mensaje: string = '';
  llave: string = '';
  resultado: string = '';
  tipoSeleccionado: string = 'sha256';

  constructor(private cryptoApi: CryptoApiService) {}

  /**
   * Maneja la lógica de Cifrado y Hashing
   */
  procesar() {
    if (!this.mensaje) {
      alert('Por favor, ingresa un mensaje para procesar.');
      return;
    }

    // Valida que los métodos que requieren llave la tengan
    if (this.tipoSeleccionado === 'symmetric' || this.tipoSeleccionado === 'asymetric') {
      if (!this.llave) {
        alert('Este método requiere una llave o password.');
        return;
      }
    }

    // Objeto observador genérico para manejar respuestas de la API
    const observer = {
      next: (res: any) => {
        // Asigna el resultado buscando las posibles propiedades de respuesta del backend
        this.resultado = res.hash || res.encryptedData || 'Sin respuesta del servidor';
      },
      error: (err: any) => {
        console.error('Error en la operación:', err);
        alert('Error al conectar con el backend. Revisa la consola.');
      }
    };

    // Despachador de peticiones según la opción del Select
    switch (this.tipoSeleccionado) {
      case 'sha256':
      case 'sha512':
        this.cryptoApi.postHash(this.mensaje, this.tipoSeleccionado).subscribe(observer);
        break;

      case 'symmetric':
        this.cryptoApi.postSymmetric(this.mensaje, this.tipoSeleccionado, this.llave).subscribe(observer);
        break;

      case 'asymetric':
        this.cryptoApi.postAsymmetric(this.mensaje, this.tipoSeleccionado, this.llave).subscribe(observer);
        break;

      case 'custom':
        this.cryptoApi.postCustomEncrypt(this.mensaje, this.tipoSeleccionado, this.llave).subscribe(observer);
        break;

      default:
        console.warn('Tipo de algoritmo no reconocido');
    }
  }

  /**
   * Maneja la lógica de Desencriptación
   */
  desencriptar() {
    if (!this.mensaje || !this.llave) {
      alert('Se requiere el mensaje cifrado y la llave correspondiente.');
      return;
    }

    const observer = {
      next: (res: any) => {
        this.resultado = res.decryptedData || 'No se pudo desencriptar';
      },
      error: (err: any) => {
        console.error('Error al desencriptar:', err);
        alert('Error: Revisa que la llave sea correcta para el tipo de algoritmo seleccionado.');
      }
    };

    // DIFERENCIAR AQUÍ EL TIPO
    if (this.tipoSeleccionado === 'symmetric') {
      this.cryptoApi.postDecrypt(this.mensaje, 'symmetric', this.llave).subscribe(observer);
    } else if (this.tipoSeleccionado === 'asymetric') {
      // Llamamos explícitamente a la lógica asimétrica
      this.cryptoApi.postDecrypt(this.mensaje, 'asymetric', this.llave).subscribe(observer);
    } else if (this.tipoSeleccionado === 'custom') {
      this.cryptoApi.postCustomDecrypt(this.mensaje, 'custom', this.llave).subscribe(observer);
    } else {
      alert('Los algoritmos Hash no se pueden desencriptar.');
    }
  }

  obtenerLlavesRSA() {
  this.cryptoApi.generateKeys().subscribe({
    next: (res: any) => {
      // Mostramos la pública para que cifre y avisamos que guarde la privada
      this.llave = res.publicKey; 
      this.resultado = "TU LLAVE PRIVADA (GUÁRDALA PARA DESCIFRAR):\n\n" + res.privateKey;
      alert('Se han generado las llaves. Copia la PRIVADA que aparece en el resultado.');
    }
  });
}
}