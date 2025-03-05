import { Routes } from '@angular/router';
import { LoginPage } from './pages/login.page';
import { MateriasPage } from './pages/materias.page';
import { EstudiantesPage } from './pages/estudiantes.page';
import { MatriculasPage } from './pages/matriculas.page';
import { guardianAuthPrivada, guardianAuthPublicas } from './guards/auth.guards';

export const routes: Routes = [
    { path: 'iniciar-sesion', component: LoginPage , canActivate: [guardianAuthPublicas]},
    { path: 'modulo-materias', component: MateriasPage, canActivate: [guardianAuthPrivada]},
    { path: 'modulo-estudiantes', component: EstudiantesPage, canActivate: [guardianAuthPrivada]},
    { path: 'modulo-matriculas', component: MatriculasPage, canActivate: [guardianAuthPrivada]},
    { path: '**', redirectTo: '/iniciar-sesion', pathMatch:'full' }
];
