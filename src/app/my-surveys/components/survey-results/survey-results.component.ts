import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISurvey } from '../../../common/interfaces/survey.interface';
import { DestroyService } from '../../../common/services/destroy.service';
import { ConfirmationService } from 'primeng/api';
import { SurveyService } from '../../../common/services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { MySurveyService } from '../../../common/services/my-survey.service';

@Component({
    selector: 'app-survey-results',
    templateUrl: './survey-results.component.html',
    styleUrls: ['./survey-results.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService, ConfirmationService],
})
export class SurveyResultsComponent implements OnInit {

    @Output() cancelClicked = new EventEmitter();

    _survey: ISurvey;

    loading = false;

    errorText = '';

    surveyResults = [];

    constructor(private _cd: ChangeDetectorRef,
                private _destroy$: DestroyService,
                private _surveyService: SurveyService,
                private _mySurveyService: MySurveyService,
                private _route: ActivatedRoute, ) {}

    ngOnInit(): void {
        this._surveyService.getSurveyFromId(this._route.snapshot.params.surveyId).then((doc) => {
            if (doc.exists) {
                this._survey = doc.data() as ISurvey;
                this._survey.id = this._route.snapshot.params.surveyId;
                this.getSurveyResults();
            }
            this._cd.markForCheck();
        });
    }

    getSurveyResults() {

    }
}
