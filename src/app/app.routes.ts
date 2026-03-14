import { Routes } from '@angular/router';
import { OffersComponent } from './components/offers/offers.component';
import { HomeComponent } from './components/home/home.component';
import { ScheduleBookingComponent } from './components/schedule-booking/schedule-booking.component';
import { ScheduleManagementComponent } from './components/schedule-management/schedule-management.component';

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
  },
  {
    path: 'schedule',
    component: ScheduleBookingComponent
  },
  {
    path: 'schedule-management',
    component: ScheduleManagementComponent
  }
];
