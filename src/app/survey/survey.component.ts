import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import * as _ from 'lodash';
import { DestroyService } from '../common/services/destroy.service';
import { SurveyService } from '../common/services/survey.service';
import { ISurvey } from '../common/interfaces/survey.interface';
import { AddUpdateSurveyComponent } from './add-update-survey/add-update-survey.component';

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class SurveyComponent implements OnInit {
    surveys: ISurvey[];
    selectedSurveys: ISurvey[] = [];
    loading = false;
    errorText = '';
    surveyDialog = false;
    @ViewChild('addUpdateSurveyComponent')
    addUpdateSurveyComponent: AddUpdateSurveyComponent;
    survey: ISurvey;

    constructor(
        private _cd: ChangeDetectorRef,
        private _destroy$: DestroyService,
        private _surveyService: SurveyService
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
                this.surveys = _.cloneDeep(
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

    editSurvey(survey: ISurvey) {
        this.survey = _.cloneDeep(survey);
        this.surveyDialog = true;
    }

    deleteSurvey(survey: ISurvey) {
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
        this.selectedSurveys.forEach((value) => {
            this.deleteSurvey(value);
        });
        this.selectedSurveys = [];
    }
}
