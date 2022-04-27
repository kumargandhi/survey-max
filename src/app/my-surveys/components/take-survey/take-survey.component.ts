import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DestroyService } from '../../../common/services/destroy.service';
import { ISurvey } from '../../../common/interfaces/survey.interface';
import { SurveyService } from '../../../common/services/survey.service';

@Component({
    selector: 'app-take-survey',
    templateUrl: './take-survey.component.html',
    styleUrls: ['./take-survey.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class TakeSurveyComponent implements OnInit {

    @Output() cancelClicked = new EventEmitter();

    _survey: ISurvey;

    constructor(
      private _cd: ChangeDetectorRef,
      private _destroy$: DestroyService,
      private _surveyService: SurveyService
    ) {}

    ngOnInit(): void {}

    @Input() set survey(val: ISurvey) {
        if (val) {
            this._survey = val;
            this._cd.markForCheck();
        }
    }

    cancel() {
        this.cancelClicked.emit();
    }
}
