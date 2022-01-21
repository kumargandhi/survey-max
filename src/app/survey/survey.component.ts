import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import * as _ from 'lodash';
import { DestroyService } from '../common/services/destroy.service';
import { SurveyService } from '../common/services/survey.service';
import { ISurvey } from '../common/interfaces/survey.interface';

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
    constructor(
        private _cd: ChangeDetectorRef,
        private _destroy$: DestroyService,
        private _surveyService: SurveyService
    ) {}

    ngOnInit(): void {
        this.fetchSurveys();
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

    editUser(survey: ISurvey) {}

    deleteUser(survey: ISurvey) {}

    addNewSurvey() {}

    deleteSelectedSurveys() {}
}
