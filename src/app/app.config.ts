import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideIonicAngular({}), provideFirebaseApp(() => initializeApp({ projectId: "shelly-33b0d", appId: "1:481892726188:web:58959e39015f8fd96bf609", databaseURL: "https://shelly-33b0d-default-rtdb.firebaseio.com", storageBucket: "shelly-33b0d.firebasestorage.app", apiKey: "AIzaSyC239htBsMfKvzkD3oCT3pvBXXrQS7ubLE", authDomain: "shelly-33b0d.firebaseapp.com", messagingSenderId: "481892726188" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideFirebaseApp(() => initializeApp({ projectId: "shelly-33b0d", appId: "1:481892726188:web:58959e39015f8fd96bf609", databaseURL: "https://shelly-33b0d-default-rtdb.firebaseio.com", storageBucket: "shelly-33b0d.firebasestorage.app", apiKey: "AIzaSyC239htBsMfKvzkD3oCT3pvBXXrQS7ubLE", authDomain: "shelly-33b0d.firebaseapp.com", messagingSenderId: "481892726188" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
