import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProtegidaComponent} from "./protegida/protegida.component";
import {AuthGuardGuard} from "./guard/auth-guard.guard";
import {ContactoComponent} from "./contacto/contacto.component";
import {AboutComponent} from "./about/about.component";
import {WorksComponent} from "./works/works.component";
import {PublicGuard} from "./guard/public.guard";
import {NotFoundComponent} from "./not-found/not-found.component";

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: "/home" },
  { path: 'home', component: HomeComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'about', component: AboutComponent },
  { path: 'works', component: WorksComponent, canActivate : [AuthGuardGuard]},
  { path: 'protegida', component: ProtegidaComponent, canActivate : [AuthGuardGuard] },
  { path: '**', component: NotFoundComponent, pathMatch: 'full'},

]
