import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CryptoApiService } from '../../services/crypto-api';

@Component({
  selector: 'app-crypto-form',
  imports: [FormsModule],
  templateUrl: './crypto-form.html',
  styleUrl: './crypto-form.css',
  standalone: true
})
export class CryptoFormComponent {
  mensaje: string = '';       // Se vincula al primer input (Mensaje)
  resultado: string = '';     // Se vincula al segundo input (Cifrado)
  tipoSeleccionado: string = 'sha256'; // Por defecto

  constructor(private cryptoApi: CryptoApiService) {}

  encrypt() {
    if (!this.mensaje) return;

    // Si es un Hash 
    if (this.tipoSeleccionado === 'sha256' || this.tipoSeleccionado === 'sha512') {
      this.cryptoApi.postHash(this.mensaje, this.tipoSeleccionado).subscribe({
        next: (res: any) => this.resultado = res.hash
      });
    } 
    // Si es Simétrico 
    else if (this.tipoSeleccionado === 'symmetric') {
      this.cryptoApi.postEncrypt(this.mensaje).subscribe({
        next: (res: any) => this.resultado = res.encryptedData
      });
    }
  }
  procesar() {
  if (!this.mensaje) return;

  this.cryptoApi.postHash(this.mensaje, this.tipoSeleccionado).subscribe({
    next: (res: any) => {
      this.resultado = res.hash;
    },
    error: (err) => {
      console.error('Error de conexión:', err);
      alert('Asegúrate de que el backend de NestJS esté encendido en el puerto 3000');
    }
  });
}
}
