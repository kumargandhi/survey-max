import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PRIME_NG_MODULES } from '../constants';
import { UsersComponent } from '../users/users.component';
import { SurveyComponent } from '../survey/survey.component';
import { SidebarComponent } from '../common/components/sidebar/sidebar.component';

@NgModule({
    declarations: [
        MainComponent,
        DashboardComponent,
        UsersComponent,
        SurveyComponent,
        SidebarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ...PRIME_NG_MODULES,
        MainRoutingModule,
    ],
})
export class MainModule {}
