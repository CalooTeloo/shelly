import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, collectionData, docData } from '@angular/fire/firestore';
import { Database, ref, get } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeseraService {

  constructor(
    private afs: Firestore,
    private db: Database,
    private authService: AuthService
  ) {}

  private get basePath(): string {
    const uid = this.authService.currentUser?.uid;
    if (!uid) {
      throw new Error('No hay usuario autenticado');
    }
    return `users/${uid}/peseras`;
  }

  // Get all peseras
  getPeseras(): Observable<any[]> {
    const peserasRef = collection(this.afs, this.basePath);
    return collectionData(peserasRef, { idField: 'id' }) as Observable<any[]>;
  }

  // Get a single pesera by ID
  getPeseraById(id: string): Observable<any> {
    const peseraRef = doc(this.afs, `${this.basePath}/${id}`);
    return docData(peseraRef, { idField: 'id' }) as Observable<any>;
  }

  // Create a new pesera
  createPesera(data: any): Promise<any> {
    const peserasRef = collection(this.afs, this.basePath);
    return addDoc(peserasRef, data);
  }

  // Update an existing pesera
  updatePesera(id: string, data: any): Promise<void> {
    const peseraRef = doc(this.afs, `${this.basePath}/${id}`);
    return updateDoc(peseraRef, data);
  }

  // Delete a pesera
  deletePesera(id: string): Promise<void> {
    const peseraRef = doc(this.afs, `${this.basePath}/${id}`);
    return deleteDoc(peseraRef);
  }

  // Validate a serial number in the Realtime Database
  async validarNumeroSerie(numeroSerie: string): Promise<boolean> {
    const peseraRef = ref(this.db, `peseras/${numeroSerie}`);
    const snapshot = await get(peseraRef);
    return snapshot.exists();
  }
}