import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SushisComponent }      from './sushis/sushis.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { SushiDetailComponent }  from './sushi-detail/sushi-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: SushiDetailComponent },
  { path: 'sushis', component: SushisComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
