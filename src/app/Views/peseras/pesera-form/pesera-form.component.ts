import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeseraService } from '../../../Services/pesera.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-pesera-form',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './pesera-form.component.html',
  styleUrls: ['./pesera-form.component.scss']
})
export class PeseraFormComponent implements OnInit {
  peseraId: string | null = null;
  nombre: string = '';
  numeroSerie: string = '';
  horarioAlimentacion: number = 0;
  foto: string = '';
  tortugas: any[] = []; // Inicialmente vacío, se pueden agregar más tortugas
  nuevaTortuga: string = '';
  errorMessage: string = '';

  constructor(
    private peseraService: PeseraService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Si hay un id en la ruta, es modo edición
    this.peseraId = this.route.snapshot.paramMap.get('id');
    if (this.peseraId) {
      this.loadPesera();
    }
  }

  loadPesera(): void {
    this.peseraService.getPeseraById(this.peseraId!).subscribe(data => {
      if (data) {
        this.nombre = data.nombre;
        this.numeroSerie = data.numeroSerie;
        this.horarioAlimentacion = data.horarioAlimentacion;
        this.foto = data.foto;
        this.tortugas = data.tortugas || [];
      }
    });
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });
    this.foto = image.dataUrl!;
  }

  addTortuga(): void {
    if (this.nuevaTortuga.trim() !== '') {
      this.tortugas.push({ nombre: this.nuevaTortuga });
      this.nuevaTortuga = '';
    }
  }

  async onSubmit(): Promise<void> {
    // Validar campos (puedes agregar más validaciones según sea necesario)
    if (!this.nombre || !this.numeroSerie || this.horarioAlimentacion <= 0) {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
      return;
    }

    // Validar en la Realtime Database si el número de serie existe
    const existe = await this.peseraService.validarNumeroSerie(this.numeroSerie);
    if (!existe) {
      this.errorMessage = 'El número de serie no existe en la Realtime Database.';
      return;
    }

    // Construir objeto pesera
    const peseraData = {
      nombre: this.nombre,
      numeroSerie: this.numeroSerie,
      horarioAlimentacion: this.horarioAlimentacion,
      foto: this.foto,
      tortugas: this.tortugas
    };

    try {
      if (this.peseraId) {
        // Modo edición
        await this.peseraService.updatePesera(this.peseraId, peseraData);
      } else {
        // Modo creación
        await this.peseraService.createPesera(peseraData);
      }
      this.router.navigate(['/pesera-list']);
    } catch (error) {
      this.errorMessage = 'Error al guardar la pesera. Inténtalo de nuevo.';
    }
  }
}
