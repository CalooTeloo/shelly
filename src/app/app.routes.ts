import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Views/auth/login/login.component';
import { RegisterComponent } from './Views/auth/register/register.component';
import { PeseraListComponent } from './Views/peseras/pesera-list/pesera-list.component';
import { PeseraDetailComponent } from './Views/peseras/pesera-detail/pesera-detail.component';
import { PeseraFormComponent } from './Views/peseras/pesera-form/pesera-form.component';

// Importa tu guard (ajusta la ruta según dónde lo generaste)
import { AuthGuard } from './Services/auth.guard';

export 
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rutas protegidas con AuthGuard
  { path: 'pesera-list', component: PeseraListComponent, canActivate: [AuthGuard] },
  { path: 'pesera-detail/:id', component: PeseraDetailComponent, canActivate: [AuthGuard] },
  { path: 'pesera-form', component: PeseraFormComponent, canActivate: [AuthGuard] },
  { path: 'pesera-form/:id', component: PeseraFormComponent, canActivate: [AuthGuard] },

  // Cualquier ruta no definida redirige a login
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
