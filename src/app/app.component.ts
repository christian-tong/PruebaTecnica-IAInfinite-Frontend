import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { TokenService } from './core';
import { RegisterClientService } from './core/service/RegisterClient.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private fb = inject(FormBuilder);
  private tokenService = inject(TokenService);
  private registerClientService = inject(RegisterClientService);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    token: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.tokenService.getToken().subscribe({
      next: (response) => {
        console.log(response.token);
        this.registerForm.patchValue({
          token: response.token,
        });
      },
      error: () => {
        alert('Error en el backend');
      },
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      // Preparar los datos para el backend
      const clientData = {
        token: formData.token,
        clientData: {
          name: formData.name,
          email: formData.email,
        },
      };

      // Llamar al método registerClient del servicio
      this.registerClientService.registerClient(clientData).subscribe({
        next: (response) => {
          console.log('Cliente registrado:', response);
          alert('Cliente registrado exitosamente');
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          alert('Error durante el registro del cliente');
        },
      });
    } else {
      alert('Formulario no válido');
    }
  }
}
