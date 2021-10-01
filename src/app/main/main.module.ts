import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PRIME_NG_MODULES } from '../constants';
import { UsersComponent } from '../users/users.component';

@NgModule({
    declarations: [MainComponent, DashboardComponent, UsersComponent],
    imports: [CommonModule, ...PRIME_NG_MODULES, MainRoutingModule],
})
export class MainModule {}
