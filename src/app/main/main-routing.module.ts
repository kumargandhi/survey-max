import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UsersComponent } from '../users/users.component';
import { SurveyComponent } from '../survey/survey.component';
import { SurveyListComponent } from '../survey/survey-list/survey-list.component';
import { QuestionListComponent } from '../survey/question-list/question-list.component';
import { MySurveysComponent } from '../my-surveys/my-surveys.component';
import { MySurveysListComponent } from '../my-surveys/components/my-surveys-list/my-surveys-list.component';
import { TakeSurveyComponent } from '../my-surveys/components/take-survey/take-survey.component';
import { SurveyResultsComponent } from '../my-surveys/components/survey-results/survey-results.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'users',
                component: UsersComponent,
            },
            {
                path: 'survey',
                component: SurveyComponent,
                children: [
                    { path: 'survey-list', component: SurveyListComponent },
                    {
                        path: ':surveyId/question-list',
                        component: QuestionListComponent,
                    },
                    { path: '', redirectTo: 'survey-list', pathMatch: 'full' },
                ],
            },
            {
                path: 'my-surveys',
                component: MySurveysComponent,
                children: [
                    { path: 'my-surveys-list', component: MySurveysListComponent },
                    {
                        path: ':surveyId/take-survey',
                        component: TakeSurveyComponent,
                    },
                    {
                        path: ':surveyId/survey-results',
                        component: SurveyResultsComponent,
                    },
                    { path: '', redirectTo: 'my-surveys-list', pathMatch: 'full' },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {}
