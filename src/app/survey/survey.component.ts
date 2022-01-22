import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import * as _ from 'lodash';
import { DestroyService } from '../common/services/destroy.service';
import { SurveyService } from '../common/services/survey.service';
import { ISurvey, newSurvey } from '../common/interfaces/survey.interface';

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
    survey: ISurvey;
    loading = false;
    errorText = '';
    surveyDialog = false;
    submitted = false;

    constructor(
        private _cd: ChangeDetectorRef,
        private _destroy$: DestroyService,
        private _surveyService: SurveyService
    ) {}

    ngOnInit(): void {
        this.fetchSurveys();
    }

    getTableSummary() {
        return `Total ${this.surveys ? this.surveys.length : 0} ${
            this.surveys && this.surveys.length > 1 ? 'Surveys' : 'Survey'
        }`;
    }

    fetchSurveys() {
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

    editSurvey(survey: ISurvey) {}

    deleteSurvey(survey: ISurvey) {}

    addNewSurvey() {
        this.survey = _.cloneDeep(newSurvey);
        this.submitted = false;
        this.surveyDialog = true;
    }

    hideDialog() {
        this.surveyDialog = false;
        this.submitted = false;
    }

    saveSurvey() {
        this.submitted = true;
        this.loading = true;
        this.errorText = '';
        this._surveyService.saveSurvey(this.survey).then(
            () => {
                this.loading = false;
                this.fetchSurveys();
                this._cd.markForCheck();
            },
            (error) => {
                this.errorText = error;
                this.loading = false;
                this._cd.markForCheck();
            }
        );
    }

    deleteSelectedSurveys() {}
}
