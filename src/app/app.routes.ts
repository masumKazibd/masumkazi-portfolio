import { Routes } from '@angular/router';
import { OffersComponent } from './components/offers/offers.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'offers',
    component: OffersComponent
  }
];
