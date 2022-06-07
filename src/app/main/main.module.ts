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
import { HeaderComponent } from '../common/components/header/header.component';
import { InfoComponent } from '../common/components/info/info.component';
import { AddUpdateUserComponent } from '../users/add-update-user/add-update-user.component';
import { AddSurveyUserComponent } from '../survey/add-survey-user/add-survey-user.component';
import { UserProfileComponent } from '../users/user-profile/user-profile.component';
import { MySurveysComponent } from '../my-surveys/my-surveys.component';
import { MySurveyCardComponent } from '../my-surveys/components/my-survey-card/my-survey-card.component';
import { TakeSurveyComponent } from '../my-surveys/components/take-survey/take-survey.component';
import { UserAccessDirective } from '../common/directives/user-access.directive';
import { SurveyResultsComponent } from '../my-surveys/components/survey-results/survey-results.component';

@NgModule({
    declarations: [
        MainComponent,
        DashboardComponent,
        UsersComponent,
        SurveyComponent,
        SurveyListComponent,
        SidebarComponent,
        HeaderComponent,
        InfoComponent,
        AddUpdateSurveyComponent,
        QuestionListComponent,
        AddUpdateQuestionComponent,
        AddUpdateUserComponent,
        AddSurveyUserComponent,
        UserProfileComponent,
        MySurveysComponent,
        MySurveyCardComponent,
        TakeSurveyComponent,
        UserAccessDirective,
        SurveyResultsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ...MAIN_PRIME_NG_MODULES,
        MainRoutingModule,
    ],
    exports: [
        UserAccessDirective
    ]
})
export class MainModule {}
