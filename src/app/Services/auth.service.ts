import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  doc,
  setDoc
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Almacenamos el usuario actual
  private userState$ = new BehaviorSubject<User | null>(null);

  constructor(
    private afAuth: Auth,
    private firestore: Firestore
  ) {
    onAuthStateChanged(this.afAuth, (user) => {
      this.userState$.next(user);
    });
  }

  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.afAuth, email, password);
      // El estado se actualizará automáticamente por onAuthStateChanged
      return result;
    } catch (error) {
      throw new Error('Correo o contraseña incorrectos.');
    }
  }

  async register(email: string, password: string, username: string, cedula: string, pesera: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.afAuth, email, password);
      const uid = result.user.uid;

      await setDoc(doc(collection(this.firestore, 'users'), uid), {
        username,
        email,
        cedula,
        pesera
      });

      return result;
    } catch (error) {
      throw new Error('Error en el registro. Verifica los datos.');
    }
  }

  async logout() {
    await signOut(this.afAuth);
  }

  // Devuelve un observable con el usuario actual
  get user$() {
    return this.userState$.asObservable();
  }

  // Devuelve el usuario actual de forma síncrona
  get currentUser(): User | null {
    return this.userState$.value;
  }

  // Método auxiliar para verificar autenticación
  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}
