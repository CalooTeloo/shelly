import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeseraService } from '../../../Services/pesera.service';
import { NgIf, NgFor } from '@angular/common';
@Component({
  selector: 'app-pesera-detail',
  imports: [NgFor, NgIf],
  templateUrl: './pesera-detail.component.html',
  styleUrls: ['./pesera-detail.component.scss']
})
export class PeseraDetailComponent implements OnInit {
  pesera: any;
  peseraId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peseraService: PeseraService
  ) {}

  ngOnInit(): void {
    // Se asume que el parámetro de la ruta es el id o nombre único de la pesera
    this.peseraId = this.route.snapshot.paramMap.get('id') || '';
    this.getPesera();
  }

  getPesera(): void {
    this.peseraService.getPeseraById(this.peseraId).subscribe(data => {
      this.pesera = data;
    });
  }

  onEdit(): void {
    // Redirigir a la vista de formulario en modo edición
    this.router.navigate(['/pesera-form', this.peseraId]);
  }

  onDelete(): void {
    if (confirm('¿Seguro que deseas eliminar esta pesera?')) {
      this.peseraService.deletePesera(this.peseraId).then(() => {
        this.router.navigate(['/pesera-list']);
      });
    }
  }
}
