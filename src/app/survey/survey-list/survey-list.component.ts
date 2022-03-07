import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { DestroyService } from '../../common/services/destroy.service';
import { SurveyService } from '../../common/services/survey.service';
import { ISurvey } from '../../common/interfaces/survey.interface';
import { AddUpdateSurveyComponent } from '../add-update-survey/add-update-survey.component';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-survey-list',
    templateUrl: './survey-list.component.html',
    styleUrls: ['./survey-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService, ConfirmationService],
})
export class SurveyListComponent implements OnInit {
    surveys: ISurvey[];
    selectedSurveys: ISurvey[] = [];
    loading = false;
    errorText = '';
    surveyDialog = false;
    @ViewChild('addUpdateSurveyComponent')
    addUpdateSurveyComponent: AddUpdateSurveyComponent;
    survey: ISurvey;
    confirmationMessage = '';

    constructor(
        private _cd: ChangeDetectorRef,
        private _destroy$: DestroyService,
        private _surveyService: SurveyService,
        private _route: ActivatedRoute,
        private _router: Router,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.getSurveys();
    }

    getTableSummary() {
        return `Total ${this.surveys ? this.surveys.length : 0} ${
            this.surveys && this.surveys.length > 1 ? 'Surveys' : 'Survey'
        }`;
    }

    getSurveys() {
        this.loading = true;
        this.errorText = '';
        this._surveyService.getSurveys().subscribe(
            (data) => {
                this.surveys = cloneDeep(
                    data.map((e) => {
                        const s: ISurvey = e.payload.doc.data() as ISurvey;
                        s.id = e.payload.doc.id;
                        return s;
                    })
                );
                this.loading = false;
                this._cd.markForCheck();
            },
            (error) => {
                this.errorText = error;
                this.loading = false;
                this._cd.markForCheck();
            }
        );
    }

    goToQuestions(survey: ISurvey) {
        this._router.navigate([survey.id + '/question-list'], {
            relativeTo: this._route.parent,
        });
    }

    editSurvey(survey: ISurvey) {
        this.survey = cloneDeep(survey);
        this.surveyDialog = true;
    }

    deleteSurvey(survey: ISurvey) {
        this.confirmationMessage = `Are you sure that you want to delete <strong>${survey.name}</strong> survey?`;
        this.confirmationService.confirm({
            message: this.confirmationMessage,
            accept: () => {
                this.loading = true;
                this.errorText = '';
                this._surveyService
                    .deleteSurvey(survey.id)
                    .then(() => {
                        this.loading = false;
                        this.getSurveys();
                    })
                    .catch((error) => {
                        this.loading = false;
                        this.errorText = error;
                    });
            },
        });
    }

    addNewSurvey() {
        this.survey = null;
        this.surveyDialog = true;
    }

    hideDialog() {
        this.survey = null;
        this.surveyDialog = false;
    }

    saveSurvey() {
        this.loading = true;
        this.errorText = '';
        if (this.survey) {
            this._surveyService
                .updateSurvey({
                    ...this.addUpdateSurveyComponent.getSurvey,
                    id: this.survey.id,
                })
                .then(() => {
                    this.loading = false;
                    this.survey = null;
                    this.hideDialog();
                    this.getSurveys();
                    this._cd.markForCheck();
                })
                .catch((error) => {
                    this.addUpdateSurveyComponent.errorText = error;
                    this.loading = false;
                    this._cd.markForCheck();
                });
        } else {
            this._surveyService
                .saveSurvey(this.addUpdateSurveyComponent.getSurvey)
                .then(() => {
                    this.loading = false;
                    this.hideDialog();
                    this.getSurveys();
                    this._cd.markForCheck();
                })
                .catch((error) => {
                    this.addUpdateSurveyComponent.errorText = error;
                    this.loading = false;
                    this._cd.markForCheck();
                });
        }
    }

    deleteSelectedSurveys() {
        const surveyNames: string[] = cloneDeep(this.selectedSurveys).map(
            (item) => item.name
        );
        this.confirmationMessage = `Are you sure that you want to delete <strong>${surveyNames.join(
            ', '
        )}</strong> ${surveyNames.length > 1 ? 'surveys' : 'survey'}?`;
        this.confirmationService.confirm({
            message: this.confirmationMessage,
            accept: () => {
                this.selectedSurveys.forEach((value) => {
                    this.deleteSurvey(value);
                });
            },
        });
    }
}
