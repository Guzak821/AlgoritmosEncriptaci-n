import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CryptoApiService } from '../../services/crypto-api';

@Component({
  selector: 'app-crypto-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './crypto-form.html',
  styleUrl: './crypto-form.css',
  standalone: true
})
export class CryptoFormComponent {
  mensaje: string = '';
  resultado: string = '';
  tipoSeleccionado: string = 'sha256';

  constructor(private cryptoApi: CryptoApiService) {}

  procesar() {
    if (!this.mensaje) {
      alert('Por favor, ingresa un mensaje');
      return;
    }

    // Definimos un objeto para manejar las respuestas de forma genérica
    const observer = {
      next: (res: any) => {
        // Adaptamos la asignación según lo que responda tu API en cada caso
        this.resultado = res.hash || res.encryptedData || 'Sin respuesta';
      },
      error: (err: any) => {
        console.error('Error de conexión:', err);
        alert('Error al conectar con el backend en el puerto 3000');
      }
    };

    // Despachador según el tipo seleccionado
    switch (this.tipoSeleccionado) {
      case 'sha256':
      case 'sha512':
        this.cryptoApi.postHash(this.mensaje, this.tipoSeleccionado).subscribe(observer);
        break;

      case 'symmetric':
        this.cryptoApi.postSymetric(this.mensaje, this.tipoSeleccionado).subscribe(observer);
        break;

      case 'asymetric':
        this.cryptoApi.postAsymetric(this.mensaje, this.tipoSeleccionado).subscribe(observer);
        break;

      default:
        console.warn('Tipo de cifrado no soportado');
    }
  }
}