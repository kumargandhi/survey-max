import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { SidebarComponent } from '../common/components/sidebar/sidebar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MAIN_PRIME_NG_MODULES } from '../constants';
import { UsersComponent } from '../users/users.component';
import { SurveyComponent } from '../survey/survey.component';
import { SurveyListComponent } from '../survey/survey-list/survey-list.component';
import { AddUpdateSurveyComponent } from '../survey/add-update-survey/add-update-survey.component';
import { QuestionListComponent } from '../survey/question-list/question-list.component';
import { AddUpdateQuestionComponent } from '../survey/add-update-question/add-update-question.component';

@NgModule({
    declarations: [
        MainComponent,
        DashboardComponent,
        UsersComponent,
        SurveyComponent,
        SurveyListComponent,
        SidebarComponent,
        AddUpdateSurveyComponent,
        QuestionListComponent,
        AddUpdateQuestionComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ...MAIN_PRIME_NG_MODULES,
        MainRoutingModule,
    ],
})
export class MainModule {}
