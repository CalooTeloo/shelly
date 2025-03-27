import { Component, OnInit } from '@angular/core';
import { PeseraService } from '../../../Services/pesera.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-pesera-list',
  imports: [RouterLink, NgFor],
  templateUrl: './pesera-list.component.html',
  styleUrls: ['./pesera-list.component.scss']
})
export class PeseraListComponent implements OnInit {
  peseras: any[] = [];

  constructor(private peseraService: PeseraService) {}

  ngOnInit(): void {
    // Obtener todas las peseras del usuario actual
    this.peseraService.getPeseras().subscribe(data => {
      this.peseras = data;
    });
  }
}
