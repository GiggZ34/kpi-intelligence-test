import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  scrollOffset: [0, 90]
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'establishments',
    pathMatch: 'full',
  },
  {
    path: 'establishments',
    loadChildren: () => import('./pages/establishments/establishments.module').then(mod => mod.EstablishmentsModule),
  },
  {
    path: 'projects',
    loadChildren: () => import('./pages/projects/projects.module').then(mod => mod.ProjectsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
