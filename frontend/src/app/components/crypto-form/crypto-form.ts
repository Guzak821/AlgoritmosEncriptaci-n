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

      default:
        console.warn('Tipo de algoritmo no reconocido');
    }
  }

  /**
   * Maneja la lógica de Desencriptación
   */
  desencriptar() {
    if (!this.mensaje || !this.llave) {
      alert('Se requiere el mensaje cifrado en el campo "Mensaje" y la llave correspondiente.');
      return;
    }

    this.cryptoApi.postDecrypt(this.mensaje, this.tipoSeleccionado, this.llave).subscribe({
      next: (res: any) => {
        this.resultado = res.decryptedData || 'No se pudo desencriptar';
      },
      error: (err: any) => {
        console.error('Error al desencriptar:', err);
        alert('Error: Revisa que la llave sea correcta o que el formato del mensaje sea válido.');
      }
    });
  }
}