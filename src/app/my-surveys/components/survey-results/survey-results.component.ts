import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISurvey } from '../../../common/interfaces/survey.interface';
import { DestroyService } from '../../../common/services/destroy.service';
import { ConfirmationService } from 'primeng/api';
import { SurveyService } from '../../../common/services/survey.service';

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
                private _surveyService: SurveyService, ) {}

    ngOnInit(): void {}

    @Input() set survey(val: ISurvey) {
        if (val) {
            this._survey = val;
            // this.getQuestions();
            this._cd.markForCheck();
        }
    }
}
