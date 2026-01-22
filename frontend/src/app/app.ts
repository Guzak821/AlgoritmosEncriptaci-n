import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CryptoFormComponent } from './components/crypto-form/crypto-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CryptoFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
