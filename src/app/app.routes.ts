import { Routes } from '@angular/router';
import { LoginPage } from './pages/login.page';
import { AuditoriosPage } from './pages/auditorios.page';
import { ConferencistasPage } from './pages/conferencistas.page';
import { ReservasPage } from './pages/reservas.page';
import { guardianAuthPrivada, guardianAuthPublicas } from './guards/auth.guards';

export const routes: Routes = [
    { path: 'iniciar-sesion', component: LoginPage , canActivate: [guardianAuthPublicas]},
    { path: 'modulo-auditorios', component: AuditoriosPage, canActivate: [guardianAuthPrivada]},
    { path: 'modulo-conferencistas', component: ConferencistasPage, canActivate: [guardianAuthPrivada]},
    { path: 'modulo-reservas', component: ReservasPage, canActivate: [guardianAuthPrivada]},
    { path: '**', redirectTo: '/iniciar-sesion', pathMatch:'full' }
];
